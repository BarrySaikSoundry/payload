import executeAccess from '../../auth/executeAccess.js';
import { combineQueries } from '../../database/combineQueries.js';
import { validateQueryPaths } from '../../database/queryValidation/validateQueryPaths.js';
import { afterRead } from '../../fields/hooks/afterRead/index.js';
import { commitTransaction } from '../../utilities/commitTransaction.js';
import { initTransaction } from '../../utilities/initTransaction.js';
import { killTransaction } from '../../utilities/killTransaction.js';
import { buildVersionCollectionFields } from '../../versions/buildCollectionFields.js';
import { appendVersionToQueryKey } from '../../versions/drafts/appendVersionToQueryKey.js';
import { getQueryDraftsSort } from '../../versions/drafts/getQueryDraftsSort.js';
import { buildAfterOperation } from './utils.js';
export const findOperation = async (incomingArgs)=>{
    let args = incomingArgs;
    try {
        const shouldCommit = await initTransaction(args.req);
        // /////////////////////////////////////
        // beforeOperation - Collection
        // /////////////////////////////////////
        await args.collection.config.hooks.beforeOperation.reduce(async (priorHook, hook)=>{
            await priorHook;
            args = await hook({
                args,
                collection: args.collection.config,
                context: args.req.context,
                operation: 'read',
                req: args.req
            }) || args;
        }, Promise.resolve());
        const { collection: { config: collectionConfig }, collection, currentDepth, depth, disableErrors, draft: draftsEnabled, limit, overrideAccess, page, pagination = true, req: { fallbackLocale, locale, payload }, req, showHiddenFields, sort, where } = args;
        // /////////////////////////////////////
        // Access
        // /////////////////////////////////////
        let accessResult;
        if (!overrideAccess) {
            accessResult = await executeAccess({
                disableErrors,
                req
            }, collectionConfig.access.read);
            // If errors are disabled, and access returns false, return empty results
            if (accessResult === false) {
                return {
                    docs: [],
                    hasNextPage: false,
                    hasPrevPage: false,
                    limit,
                    nextPage: null,
                    page: 1,
                    pagingCounter: 1,
                    prevPage: null,
                    totalDocs: 0,
                    totalPages: 1
                };
            }
        }
        // /////////////////////////////////////
        // Find
        // /////////////////////////////////////
        const usePagination = pagination && limit !== 0;
        const sanitizedLimit = limit ?? (usePagination ? 10 : 0);
        const sanitizedPage = page || 1;
        let result;
        let fullWhere = combineQueries(where, accessResult);
        if (collectionConfig.versions?.drafts && draftsEnabled) {
            fullWhere = appendVersionToQueryKey(fullWhere);
            await validateQueryPaths({
                collectionConfig: collection.config,
                overrideAccess,
                req,
                versionFields: buildVersionCollectionFields(collection.config),
                where: fullWhere
            });
            result = await payload.db.queryDrafts({
                collection: collectionConfig.slug,
                limit: sanitizedLimit,
                locale,
                page: sanitizedPage,
                pagination: usePagination,
                req,
                sort: getQueryDraftsSort(sort),
                where: fullWhere
            });
        } else {
            await validateQueryPaths({
                collectionConfig,
                overrideAccess,
                req,
                where
            });
            result = await payload.db.find({
                collection: collectionConfig.slug,
                limit: sanitizedLimit,
                locale,
                page: sanitizedPage,
                pagination,
                req,
                sort,
                where: fullWhere
            });
        }
        // /////////////////////////////////////
        // beforeRead - Collection
        // /////////////////////////////////////
        result = {
            ...result,
            docs: await Promise.all(result.docs.map(async (doc)=>{
                let docRef = doc;
                await collectionConfig.hooks.beforeRead.reduce(async (priorHook, hook)=>{
                    await priorHook;
                    docRef = await hook({
                        collection: collectionConfig,
                        context: req.context,
                        doc: docRef,
                        query: fullWhere,
                        req
                    }) || docRef;
                }, Promise.resolve());
                return docRef;
            }))
        };
        // /////////////////////////////////////
        // afterRead - Fields
        // /////////////////////////////////////
        result = {
            ...result,
            docs: await Promise.all(result.docs.map(async (doc)=>afterRead({
                    collection: collectionConfig,
                    context: req.context,
                    currentDepth,
                    depth,
                    doc,
                    draft: draftsEnabled,
                    fallbackLocale,
                    findMany: true,
                    global: null,
                    locale,
                    overrideAccess,
                    req,
                    showHiddenFields
                })))
        };
        // /////////////////////////////////////
        // afterRead - Collection
        // /////////////////////////////////////
        result = {
            ...result,
            docs: await Promise.all(result.docs.map(async (doc)=>{
                let docRef = doc;
                await collectionConfig.hooks.afterRead.reduce(async (priorHook, hook)=>{
                    await priorHook;
                    docRef = await hook({
                        collection: collectionConfig,
                        context: req.context,
                        doc: docRef,
                        findMany: true,
                        query: fullWhere,
                        req
                    }) || doc;
                }, Promise.resolve());
                return docRef;
            }))
        };
        // /////////////////////////////////////
        // afterOperation - Collection
        // /////////////////////////////////////
        result = await buildAfterOperation({
            args,
            collection: collectionConfig,
            operation: 'find',
            result
        });
        // /////////////////////////////////////
        // Return results
        // /////////////////////////////////////
        if (shouldCommit) await commitTransaction(req);
        return result;
    } catch (error) {
        await killTransaction(args.req);
        throw error;
    }
};

//# sourceMappingURL=find.js.map