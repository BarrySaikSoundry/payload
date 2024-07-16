import { MissingEditorProp } from '../../../errors/index.js';
import { fieldAffectsData, tabHasName } from '../../config/types.js';
import getValueWithDefault from '../../getDefaultValue.js';
import { getFieldPaths } from '../../getFieldPaths.js';
import { relationshipPopulationPromise } from './relationshipPopulationPromise.js';
import { traverseFields } from './traverseFields.js';
// This function is responsible for the following actions, in order:
// - Remove hidden fields from response
// - Flatten locales into requested locale
// - Sanitize outgoing data (point field, etc.)
// - Execute field hooks
// - Execute read access control
// - Populate relationships
export const promise = async ({ collection, context, currentDepth, depth, doc, draft, fallbackLocale, field, fieldPromises, findMany, flattenLocales, global, locale, overrideAccess, parentPath, parentSchemaPath, populationPromises, req, showHiddenFields, siblingDoc, triggerAccessControl = true, triggerHooks = true })=>{
    const { path: fieldPath, schemaPath: fieldSchemaPath } = getFieldPaths({
        field,
        parentPath,
        parentSchemaPath
    });
    if (fieldAffectsData(field) && field.hidden && typeof siblingDoc[field.name] !== 'undefined' && !showHiddenFields) {
        delete siblingDoc[field.name];
    }
    const shouldHoistLocalizedValue = flattenLocales && fieldAffectsData(field) && typeof siblingDoc[field.name] === 'object' && siblingDoc[field.name] !== null && field.localized && locale !== 'all' && req.payload.config.localization;
    if (shouldHoistLocalizedValue) {
        // replace actual value with localized value before sanitizing
        // { [locale]: fields } -> fields
        const value = siblingDoc[field.name][locale];
        let hoistedValue = value;
        if (fallbackLocale && fallbackLocale !== locale) {
            const fallbackValue = siblingDoc[field.name][fallbackLocale];
            const isNullOrUndefined = typeof value === 'undefined' || value === null;
            if (fallbackValue) {
                switch(field.type){
                    case 'text':
                    case 'textarea':
                        {
                            if (value === '' || isNullOrUndefined) {
                                hoistedValue = fallbackValue;
                            }
                            break;
                        }
                    default:
                        {
                            if (isNullOrUndefined) {
                                hoistedValue = fallbackValue;
                            }
                            break;
                        }
                }
            }
        }
        siblingDoc[field.name] = hoistedValue;
    }
    // Sanitize outgoing field value
    switch(field.type){
        case 'group':
            {
                // Fill groups with empty objects so fields with hooks within groups can populate
                // themselves virtually as necessary
                if (typeof siblingDoc[field.name] === 'undefined') {
                    siblingDoc[field.name] = {};
                }
                break;
            }
        case 'tabs':
            {
                field.tabs.forEach((tab)=>{
                    if (tabHasName(tab) && (typeof siblingDoc[tab.name] === 'undefined' || siblingDoc[tab.name] === null)) {
                        siblingDoc[tab.name] = {};
                    }
                });
                break;
            }
        case 'richText':
            {
                if (!field?.editor) {
                    throw new MissingEditorProp(field) // while we allow disabling editor functionality, you should not have any richText fields defined if you do not have an editor
                    ;
                }
                if (typeof field?.editor === 'function') {
                    throw new Error('Attempted to access unsanitized rich text editor.');
                }
                break;
            }
        case 'point':
            {
                const pointDoc = siblingDoc[field.name];
                if (Array.isArray(pointDoc?.coordinates) && pointDoc.coordinates.length === 2) {
                    siblingDoc[field.name] = pointDoc.coordinates;
                } else {
                    siblingDoc[field.name] = undefined;
                }
                break;
            }
        default:
            {
                break;
            }
    }
    if (fieldAffectsData(field)) {
        // Execute hooks
        if (triggerHooks && field.hooks?.afterRead) {
            await field.hooks.afterRead.reduce(async (priorHook, currentHook)=>{
                await priorHook;
                const shouldRunHookOnAllLocales = field.localized && (locale === 'all' || !flattenLocales) && typeof siblingDoc[field.name] === 'object';
                if (shouldRunHookOnAllLocales) {
                    const hookPromises = Object.entries(siblingDoc[field.name]).map(([locale, value])=>(async ()=>{
                            const hookedValue = await currentHook({
                                collection,
                                context,
                                data: doc,
                                field,
                                findMany,
                                global,
                                operation: 'read',
                                originalDoc: doc,
                                overrideAccess,
                                path: fieldPath,
                                req,
                                schemaPath: fieldSchemaPath,
                                siblingData: siblingDoc,
                                value
                            });
                            if (hookedValue !== undefined) {
                                siblingDoc[field.name][locale] = hookedValue;
                            }
                        })());
                    await Promise.all(hookPromises);
                } else {
                    const hookedValue = await currentHook({
                        collection,
                        context,
                        data: doc,
                        field,
                        findMany,
                        global,
                        operation: 'read',
                        originalDoc: doc,
                        overrideAccess,
                        path: fieldPath,
                        req,
                        schemaPath: fieldSchemaPath,
                        siblingData: siblingDoc,
                        value: siblingDoc[field.name]
                    });
                    if (hookedValue !== undefined) {
                        siblingDoc[field.name] = hookedValue;
                    }
                }
            }, Promise.resolve());
        }
        // Execute access control
        let allowDefaultValue = true;
        if (triggerAccessControl && field.access && field.access.read) {
            const result = overrideAccess ? true : await field.access.read({
                id: doc.id,
                data: doc,
                doc,
                req,
                siblingData: siblingDoc
            });
            if (!result) {
                allowDefaultValue = false;
                delete siblingDoc[field.name];
            }
        }
        // Set defaultValue on the field for globals being returned without being first created
        // or collection documents created prior to having a default
        if (allowDefaultValue && typeof siblingDoc[field.name] === 'undefined' && typeof field.defaultValue !== 'undefined') {
            siblingDoc[field.name] = await getValueWithDefault({
                defaultValue: field.defaultValue,
                locale,
                user: req.user,
                value: siblingDoc[field.name]
            });
        }
        if (field.type === 'relationship' || field.type === 'upload') {
            populationPromises.push(relationshipPopulationPromise({
                currentDepth,
                depth,
                draft,
                fallbackLocale,
                field,
                locale,
                overrideAccess,
                req,
                showHiddenFields,
                siblingDoc
            }));
        }
    }
    switch(field.type){
        case 'group':
            {
                let groupDoc = siblingDoc[field.name];
                if (typeof siblingDoc[field.name] !== 'object') groupDoc = {};
                traverseFields({
                    collection,
                    context,
                    currentDepth,
                    depth,
                    doc,
                    draft,
                    fallbackLocale,
                    fieldPromises,
                    fields: field.fields,
                    findMany,
                    flattenLocales,
                    global,
                    locale,
                    overrideAccess,
                    path: fieldPath,
                    populationPromises,
                    req,
                    schemaPath: fieldSchemaPath,
                    showHiddenFields,
                    siblingDoc: groupDoc,
                    triggerAccessControl,
                    triggerHooks
                });
                break;
            }
        case 'array':
            {
                const rows = siblingDoc[field.name];
                if (Array.isArray(rows)) {
                    rows.forEach((row, i)=>{
                        traverseFields({
                            collection,
                            context,
                            currentDepth,
                            depth,
                            doc,
                            draft,
                            fallbackLocale,
                            fieldPromises,
                            fields: field.fields,
                            findMany,
                            flattenLocales,
                            global,
                            locale,
                            overrideAccess,
                            path: [
                                ...fieldPath,
                                i
                            ],
                            populationPromises,
                            req,
                            schemaPath: fieldSchemaPath,
                            showHiddenFields,
                            siblingDoc: row || {},
                            triggerAccessControl,
                            triggerHooks
                        });
                    });
                } else if (!shouldHoistLocalizedValue && typeof rows === 'object' && rows !== null) {
                    Object.values(rows).forEach((localeRows)=>{
                        if (Array.isArray(localeRows)) {
                            localeRows.forEach((row, i)=>{
                                traverseFields({
                                    collection,
                                    context,
                                    currentDepth,
                                    depth,
                                    doc,
                                    draft,
                                    fallbackLocale,
                                    fieldPromises,
                                    fields: field.fields,
                                    findMany,
                                    flattenLocales,
                                    global,
                                    locale,
                                    overrideAccess,
                                    path: [
                                        ...fieldPath,
                                        i
                                    ],
                                    populationPromises,
                                    req,
                                    schemaPath: fieldSchemaPath,
                                    showHiddenFields,
                                    siblingDoc: row || {},
                                    triggerAccessControl,
                                    triggerHooks
                                });
                            });
                        }
                    });
                } else {
                    siblingDoc[field.name] = [];
                }
                break;
            }
        case 'blocks':
            {
                const rows = siblingDoc[field.name];
                if (Array.isArray(rows)) {
                    rows.forEach((row, i)=>{
                        const block = field.blocks.find((blockType)=>blockType.slug === row.blockType);
                        if (block) {
                            traverseFields({
                                collection,
                                context,
                                currentDepth,
                                depth,
                                doc,
                                draft,
                                fallbackLocale,
                                fieldPromises,
                                fields: block.fields,
                                findMany,
                                flattenLocales,
                                global,
                                locale,
                                overrideAccess,
                                path: [
                                    ...fieldPath,
                                    i
                                ],
                                populationPromises,
                                req,
                                schemaPath: fieldSchemaPath,
                                showHiddenFields,
                                siblingDoc: row || {},
                                triggerAccessControl,
                                triggerHooks
                            });
                        }
                    });
                } else if (!shouldHoistLocalizedValue && typeof rows === 'object' && rows !== null) {
                    Object.values(rows).forEach((localeRows)=>{
                        if (Array.isArray(localeRows)) {
                            localeRows.forEach((row, i)=>{
                                const block = field.blocks.find((blockType)=>blockType.slug === row.blockType);
                                if (block) {
                                    traverseFields({
                                        collection,
                                        context,
                                        currentDepth,
                                        depth,
                                        doc,
                                        draft,
                                        fallbackLocale,
                                        fieldPromises,
                                        fields: block.fields,
                                        findMany,
                                        flattenLocales,
                                        global,
                                        locale,
                                        overrideAccess,
                                        path: [
                                            ...fieldPath,
                                            i
                                        ],
                                        populationPromises,
                                        req,
                                        schemaPath: fieldSchemaPath,
                                        showHiddenFields,
                                        siblingDoc: row || {},
                                        triggerAccessControl,
                                        triggerHooks
                                    });
                                }
                            });
                        }
                    });
                } else {
                    siblingDoc[field.name] = [];
                }
                break;
            }
        case 'row':
        case 'collapsible':
            {
                traverseFields({
                    collection,
                    context,
                    currentDepth,
                    depth,
                    doc,
                    draft,
                    fallbackLocale,
                    fieldPromises,
                    fields: field.fields,
                    findMany,
                    flattenLocales,
                    global,
                    locale,
                    overrideAccess,
                    path: fieldPath,
                    populationPromises,
                    req,
                    schemaPath: fieldSchemaPath,
                    showHiddenFields,
                    siblingDoc,
                    triggerAccessControl,
                    triggerHooks
                });
                break;
            }
        case 'tab':
            {
                let tabDoc = siblingDoc;
                if (tabHasName(field)) {
                    tabDoc = siblingDoc[field.name];
                    if (typeof siblingDoc[field.name] !== 'object') tabDoc = {};
                }
                traverseFields({
                    collection,
                    context,
                    currentDepth,
                    depth,
                    doc,
                    draft,
                    fallbackLocale,
                    fieldPromises,
                    fields: field.fields,
                    findMany,
                    flattenLocales,
                    global,
                    locale,
                    overrideAccess,
                    path: fieldPath,
                    populationPromises,
                    req,
                    schemaPath: fieldSchemaPath,
                    showHiddenFields,
                    siblingDoc: tabDoc,
                    triggerAccessControl,
                    triggerHooks
                });
                break;
            }
        case 'tabs':
            {
                traverseFields({
                    collection,
                    context,
                    currentDepth,
                    depth,
                    doc,
                    draft,
                    fallbackLocale,
                    fieldPromises,
                    fields: field.tabs.map((tab)=>({
                            ...tab,
                            type: 'tab'
                        })),
                    findMany,
                    flattenLocales,
                    global,
                    locale,
                    overrideAccess,
                    path: fieldPath,
                    populationPromises,
                    req,
                    schemaPath: fieldSchemaPath,
                    showHiddenFields,
                    siblingDoc,
                    triggerAccessControl,
                    triggerHooks
                });
                break;
            }
        case 'richText':
            {
                if (!field?.editor) {
                    throw new MissingEditorProp(field) // while we allow disabling editor functionality, you should not have any richText fields defined if you do not have an editor
                    ;
                }
                if (typeof field?.editor === 'function') {
                    throw new Error('Attempted to access unsanitized rich text editor.');
                }
                const editor = field?.editor;
                if (editor?.hooks?.afterRead?.length) {
                    await editor.hooks.afterRead.reduce(async (priorHook, currentHook)=>{
                        await priorHook;
                        const shouldRunHookOnAllLocales = field.localized && (locale === 'all' || !flattenLocales) && typeof siblingDoc[field.name] === 'object';
                        if (shouldRunHookOnAllLocales) {
                            const hookPromises = Object.entries(siblingDoc[field.name]).map(([locale, value])=>(async ()=>{
                                    const hookedValue = await currentHook({
                                        collection,
                                        context,
                                        currentDepth,
                                        data: doc,
                                        depth,
                                        draft,
                                        fallbackLocale,
                                        field,
                                        fieldPromises,
                                        findMany,
                                        flattenLocales,
                                        global,
                                        locale,
                                        operation: 'read',
                                        originalDoc: doc,
                                        overrideAccess,
                                        path: fieldPath,
                                        populationPromises,
                                        req,
                                        schemaPath: fieldSchemaPath,
                                        showHiddenFields,
                                        siblingData: siblingDoc,
                                        triggerAccessControl,
                                        triggerHooks,
                                        value
                                    });
                                    if (hookedValue !== undefined) {
                                        siblingDoc[field.name][locale] = hookedValue;
                                    }
                                })());
                            await Promise.all(hookPromises);
                        } else {
                            const hookedValue = await currentHook({
                                collection,
                                context,
                                currentDepth,
                                data: doc,
                                depth,
                                draft,
                                fallbackLocale,
                                field,
                                fieldPromises,
                                findMany,
                                flattenLocales,
                                global,
                                locale,
                                operation: 'read',
                                originalDoc: doc,
                                overrideAccess,
                                path: fieldPath,
                                populationPromises,
                                req,
                                schemaPath: fieldSchemaPath,
                                showHiddenFields,
                                siblingData: siblingDoc,
                                triggerAccessControl,
                                triggerHooks,
                                value: siblingDoc[field.name]
                            });
                            if (hookedValue !== undefined) {
                                siblingDoc[field.name] = hookedValue;
                            }
                        }
                    }, Promise.resolve());
                }
                break;
            }
        default:
            {
                break;
            }
    }
};

//# sourceMappingURL=promise.js.map