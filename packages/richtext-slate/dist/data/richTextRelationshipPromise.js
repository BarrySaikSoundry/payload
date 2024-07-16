import { populate } from './populate.js';
import { recurseNestedFields } from './recurseNestedFields.js';
export const recurseRichText = ({ children, currentDepth = 0, depth, draft, field, overrideAccess = false, populationPromises, req, showHiddenFields })=>{
    if (depth <= 0 || currentDepth > depth) {
        return;
    }
    if (Array.isArray(children)) {
        children.forEach((element)=>{
            if ((element.type === 'relationship' || element.type === 'upload') && element?.value?.id) {
                const collection = req.payload.collections[element?.relationTo];
                if (collection) {
                    populationPromises.push(populate({
                        id: element.value.id,
                        collection,
                        currentDepth,
                        data: element,
                        depth,
                        draft,
                        field,
                        key: 'value',
                        overrideAccess,
                        req,
                        showHiddenFields
                    }));
                }
                if (element.type === 'upload' && Array.isArray(field.admin?.upload?.collections?.[element?.relationTo]?.fields)) {
                    recurseNestedFields({
                        currentDepth,
                        data: element.fields || {},
                        depth,
                        draft,
                        fields: field.admin.upload.collections[element.relationTo].fields,
                        overrideAccess,
                        populationPromises,
                        req,
                        showHiddenFields
                    });
                }
            }
            if (element.type === 'link') {
                if (element?.doc?.value && element?.doc?.relationTo) {
                    const collection = req.payload.collections[element?.doc?.relationTo];
                    if (collection) {
                        populationPromises.push(populate({
                            id: element.doc.value,
                            collection,
                            currentDepth,
                            data: element.doc,
                            depth,
                            draft,
                            field,
                            key: 'value',
                            overrideAccess,
                            req,
                            showHiddenFields
                        }));
                    }
                }
                if (Array.isArray(field.admin?.link?.fields)) {
                    recurseNestedFields({
                        currentDepth,
                        data: element.fields || {},
                        depth,
                        draft,
                        fields: field.admin?.link?.fields,
                        overrideAccess,
                        populationPromises,
                        req,
                        showHiddenFields
                    });
                }
            }
            if (element?.children) {
                recurseRichText({
                    children: element.children,
                    currentDepth,
                    depth,
                    draft,
                    field,
                    overrideAccess,
                    populationPromises,
                    req,
                    showHiddenFields
                });
            }
        });
    }
};
export const richTextRelationshipPromise = ({ currentDepth, depth, draft, field, overrideAccess, populationPromises, req, showHiddenFields, siblingDoc })=>{
    recurseRichText({
        children: siblingDoc[field.name],
        currentDepth,
        depth,
        draft,
        field,
        overrideAccess,
        populationPromises,
        req,
        showHiddenFields
    });
};

//# sourceMappingURL=richTextRelationshipPromise.js.map