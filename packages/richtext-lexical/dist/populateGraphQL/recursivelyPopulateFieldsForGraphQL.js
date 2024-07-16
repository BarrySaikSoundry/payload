import { afterReadTraverseFields } from 'payload';
export const recursivelyPopulateFieldsForGraphQL = ({ context, currentDepth = 0, data, depth, draft, fieldPromises, fields, findMany, flattenLocales, overrideAccess = false, populationPromises, req, showHiddenFields, siblingDoc })=>{
    afterReadTraverseFields({
        collection: null,
        context,
        currentDepth,
        depth,
        doc: data,
        draft,
        fallbackLocale: req.fallbackLocale,
        fieldPromises,
        fields,
        findMany,
        flattenLocales,
        global: null,
        locale: req.locale,
        overrideAccess,
        path: [],
        populationPromises,
        req,
        schemaPath: [],
        showHiddenFields,
        siblingDoc,
        triggerHooks: false
    });
};

//# sourceMappingURL=recursivelyPopulateFieldsForGraphQL.js.map