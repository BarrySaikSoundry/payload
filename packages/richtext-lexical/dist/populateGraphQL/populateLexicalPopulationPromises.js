import { recurseNodes } from '../utilities/forEachNodeRecursively.js';
/**
 * Appends all new populationPromises to the populationPromises prop
 */ export const populateLexicalPopulationPromises = ({ context, currentDepth, depth, draft, editorPopulationPromises, field, fieldPromises, findMany, flattenLocales, overrideAccess, populationPromises, req, showHiddenFields, siblingDoc })=>{
    const shouldPopulate = depth && currentDepth <= depth;
    if (!shouldPopulate) {
        return;
    }
    recurseNodes({
        callback: (node)=>{
            if (editorPopulationPromises?.has(node.type)) {
                for (const promise of editorPopulationPromises.get(node.type)){
                    promise({
                        context,
                        currentDepth,
                        depth,
                        draft,
                        editorPopulationPromises,
                        field,
                        fieldPromises,
                        findMany,
                        flattenLocales,
                        node,
                        overrideAccess,
                        populationPromises,
                        req,
                        showHiddenFields,
                        siblingDoc
                    });
                }
            }
        },
        nodes: siblingDoc[field?.name]?.root?.children ?? []
    });
};

//# sourceMappingURL=populateLexicalPopulationPromises.js.map