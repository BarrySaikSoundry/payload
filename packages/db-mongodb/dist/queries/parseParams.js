import deepmerge from 'deepmerge';
import { combineMerge } from 'payload';
import { validOperators } from 'payload/shared';
import { buildAndOrConditions } from './buildAndOrConditions.js';
import { buildSearchParam } from './buildSearchParams.js';
export async function parseParams({ collectionSlug, fields, globalSlug, locale, payload, where }) {
    let result = {};
    if (typeof where === 'object') {
        // We need to determine if the whereKey is an AND, OR, or a schema path
        for (const relationOrPath of Object.keys(where)){
            const condition = where[relationOrPath];
            let conditionOperator;
            if (relationOrPath.toLowerCase() === 'and') {
                conditionOperator = '$and';
            } else if (relationOrPath.toLowerCase() === 'or') {
                conditionOperator = '$or';
            }
            if (Array.isArray(condition)) {
                const builtConditions = await buildAndOrConditions({
                    collectionSlug,
                    fields,
                    globalSlug,
                    locale,
                    payload,
                    where: condition
                });
                if (builtConditions.length > 0) result[conditionOperator] = builtConditions;
            } else {
                // It's a path - and there can be multiple comparisons on a single path.
                // For example - title like 'test' and title not equal to 'tester'
                // So we need to loop on keys again here to handle each operator independently
                const pathOperators = where[relationOrPath];
                if (typeof pathOperators === 'object') {
                    for (const operator of Object.keys(pathOperators)){
                        if (validOperators.includes(operator)) {
                            const searchParam = await buildSearchParam({
                                collectionSlug,
                                fields,
                                globalSlug,
                                incomingPath: relationOrPath,
                                locale,
                                operator,
                                payload,
                                val: pathOperators[operator]
                            });
                            if (searchParam?.value && searchParam?.path) {
                                result = {
                                    ...result,
                                    [searchParam.path]: searchParam.value
                                };
                            } else if (typeof searchParam?.value === 'object') {
                                result = deepmerge(result, searchParam.value, {
                                    arrayMerge: combineMerge
                                });
                            }
                        }
                    }
                }
            }
        }
    }
    return result;
}

//# sourceMappingURL=parseParams.js.map