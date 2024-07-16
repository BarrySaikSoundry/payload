import httpStatus from 'http-status';
import executeAccess from '../../auth/executeAccess.js';
import { combineQueries } from '../../database/combineQueries.js';
import { validateQueryPaths } from '../../database/queryValidation/validateQueryPaths.js';
import { APIError } from '../../errors/index.js';
import { afterRead } from '../../fields/hooks/afterRead/index.js';
import { deleteUserPreferences } from '../../preferences/deleteUserPreferences.js';
import { deleteAssociatedFiles } from '../../uploads/deleteAssociatedFiles.js';
import { commitTransaction } from '../../utilities/commitTransaction.js';
import { initTransaction } from '../../utilities/initTransaction.js';
import { killTransaction } from '../../utilities/killTransaction.js';
import { deleteCollectionVersions } from '../../versions/deleteCollectionVersions.js';
import { buildAfterOperation } from './utils.js';
export const deleteOperation = async (incomingArgs)=>{
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
                operation: 'delete',
                req: args.req
            }) || args;
        }, Promise.resolve());
        const { collection: { config: collectionConfig }, depth, overrideAccess, req: { fallbackLocale, locale, payload: { config }, payload }, req, showHiddenFields, where } = args;
        if (!where) {
            throw new APIError("Missing 'where' query of documents to delete.", httpStatus.BAD_REQUEST);
        }
        // /////////////////////////////////////
        // Access
        // /////////////////////////////////////
        let accessResult;
        if (!overrideAccess) {
            accessResult = await executeAccess({
                req
            }, collectionConfig.access.delete);
        }
        await validateQueryPaths({
            collectionConfig,
            overrideAccess,
            req,
            where
        });
        const fullWhere = combineQueries(where, accessResult);
        // /////////////////////////////////////
        // Retrieve documents
        // /////////////////////////////////////
        const { docs } = await payload.db.find({
            collection: collectionConfig.slug,
            locale,
            req,
            where: fullWhere
        });
        const errors = [];
        const promises = docs.map(async (doc)=>{
            let result;
            const { id } = doc;
            try {
                // /////////////////////////////////////
                // beforeDelete - Collection
                // /////////////////////////////////////
                await collectionConfig.hooks.beforeDelete.reduce(async (priorHook, hook)=>{
                    await priorHook;
                    return hook({
                        id,
                        collection: collectionConfig,
                        context: req.context,
                        req
                    });
                }, Promise.resolve());
                await deleteAssociatedFiles({
                    collectionConfig,
                    config,
                    doc,
                    overrideDelete: true,
                    req
                });
                // /////////////////////////////////////
                // Delete versions
                // /////////////////////////////////////
                if (collectionConfig.versions) {
                    await deleteCollectionVersions({
                        id,
                        slug: collectionConfig.slug,
                        payload,
                        req
                    });
                }
                // /////////////////////////////////////
                // Delete document
                // /////////////////////////////////////
                await payload.db.deleteOne({
                    collection: collectionConfig.slug,
                    req,
                    where: {
                        id: {
                            equals: id
                        }
                    }
                });
                // /////////////////////////////////////
                // afterRead - Fields
                // /////////////////////////////////////
                result = await afterRead({
                    collection: collectionConfig,
                    context: req.context,
                    depth,
                    doc: result || doc,
                    draft: undefined,
                    fallbackLocale,
                    global: null,
                    locale,
                    overrideAccess,
                    req,
                    showHiddenFields
                });
                // /////////////////////////////////////
                // afterRead - Collection
                // /////////////////////////////////////
                await collectionConfig.hooks.afterRead.reduce(async (priorHook, hook)=>{
                    await priorHook;
                    result = await hook({
                        collection: collectionConfig,
                        context: req.context,
                        doc: result || doc,
                        req
                    }) || result;
                }, Promise.resolve());
                // /////////////////////////////////////
                // afterDelete - Collection
                // /////////////////////////////////////
                await collectionConfig.hooks.afterDelete.reduce(async (priorHook, hook)=>{
                    await priorHook;
                    result = await hook({
                        id,
                        collection: collectionConfig,
                        context: req.context,
                        doc: result,
                        req
                    }) || result;
                }, Promise.resolve());
                // /////////////////////////////////////
                // 8. Return results
                // /////////////////////////////////////
                return result;
            } catch (error) {
                errors.push({
                    id: doc.id,
                    message: error.message
                });
            }
            return null;
        });
        const awaitedDocs = await Promise.all(promises);
        // /////////////////////////////////////
        // Delete Preferences
        // /////////////////////////////////////
        await deleteUserPreferences({
            collectionConfig,
            ids: docs.map(({ id })=>id),
            payload,
            req
        });
        let result = {
            docs: awaitedDocs.filter(Boolean),
            errors
        };
        // /////////////////////////////////////
        // afterOperation - Collection
        // /////////////////////////////////////
        result = await buildAfterOperation({
            args,
            collection: collectionConfig,
            operation: 'delete',
            result
        });
        if (shouldCommit) await commitTransaction(req);
        return result;
    } catch (error) {
        await killTransaction(args.req);
        throw error;
    }
};

//# sourceMappingURL=delete.js.map