import httpStatus from 'http-status';
import executeAccess from '../../auth/executeAccess.js';
import { combineQueries } from '../../database/combineQueries.js';
import { validateQueryPaths } from '../../database/queryValidation/validateQueryPaths.js';
import { APIError } from '../../errors/index.js';
import { afterChange } from '../../fields/hooks/afterChange/index.js';
import { afterRead } from '../../fields/hooks/afterRead/index.js';
import { beforeChange } from '../../fields/hooks/beforeChange/index.js';
import { beforeValidate } from '../../fields/hooks/beforeValidate/index.js';
import { deleteAssociatedFiles } from '../../uploads/deleteAssociatedFiles.js';
import { generateFileData } from '../../uploads/generateFileData.js';
import { unlinkTempFiles } from '../../uploads/unlinkTempFiles.js';
import { uploadFiles } from '../../uploads/uploadFiles.js';
import { commitTransaction } from '../../utilities/commitTransaction.js';
import { initTransaction } from '../../utilities/initTransaction.js';
import { killTransaction } from '../../utilities/killTransaction.js';
import { buildVersionCollectionFields } from '../../versions/buildCollectionFields.js';
import { appendVersionToQueryKey } from '../../versions/drafts/appendVersionToQueryKey.js';
import { saveVersion } from '../../versions/saveVersion.js';
import { buildAfterOperation } from './utils.js';
export const updateOperation = async (incomingArgs)=>{
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
                operation: 'update',
                req: args.req
            }) || args;
        }, Promise.resolve());
        const { collection: { config: collectionConfig }, collection, depth, draft: draftArg = false, overrideAccess, overwriteExistingFiles = false, req: { fallbackLocale, locale, payload: { config }, payload }, req, showHiddenFields, where } = args;
        if (!where) {
            throw new APIError("Missing 'where' query of documents to update.", httpStatus.BAD_REQUEST);
        }
        const { data: bulkUpdateData } = args;
        const shouldSaveDraft = Boolean(draftArg && collectionConfig.versions.drafts);
        // /////////////////////////////////////
        // Access
        // /////////////////////////////////////
        let accessResult;
        if (!overrideAccess) {
            accessResult = await executeAccess({
                req
            }, collectionConfig.access.update);
        }
        await validateQueryPaths({
            collectionConfig,
            overrideAccess,
            req,
            where
        });
        // /////////////////////////////////////
        // Retrieve documents
        // /////////////////////////////////////
        const fullWhere = combineQueries(where, accessResult);
        let docs;
        if (collectionConfig.versions?.drafts && shouldSaveDraft) {
            const versionsWhere = appendVersionToQueryKey(fullWhere);
            await validateQueryPaths({
                collectionConfig: collection.config,
                overrideAccess,
                req,
                versionFields: buildVersionCollectionFields(collection.config),
                where: versionsWhere
            });
            const query = await payload.db.queryDrafts({
                collection: collectionConfig.slug,
                locale,
                pagination: false,
                req,
                where: versionsWhere
            });
            docs = query.docs;
        } else {
            const query = await payload.db.find({
                collection: collectionConfig.slug,
                limit: 0,
                locale,
                pagination: false,
                req,
                where: fullWhere
            });
            docs = query.docs;
        }
        // /////////////////////////////////////
        // Generate data for all files and sizes
        // /////////////////////////////////////
        const { data: newFileData, files: filesToUpload } = await generateFileData({
            collection,
            config,
            data: bulkUpdateData,
            operation: 'update',
            overwriteExistingFiles,
            req,
            throwOnMissingFile: false
        });
        const errors = [];
        const promises = docs.map(async (doc)=>{
            const { id } = doc;
            let data = {
                ...newFileData,
                ...bulkUpdateData
            };
            try {
                const originalDoc = await afterRead({
                    collection: collectionConfig,
                    context: req.context,
                    depth: 0,
                    doc,
                    draft: draftArg,
                    fallbackLocale,
                    global: null,
                    locale,
                    overrideAccess: true,
                    req,
                    showHiddenFields: true
                });
                await deleteAssociatedFiles({
                    collectionConfig,
                    config,
                    doc,
                    files: filesToUpload,
                    overrideDelete: false,
                    req
                });
                // /////////////////////////////////////
                // beforeValidate - Fields
                // /////////////////////////////////////
                data = await beforeValidate({
                    id,
                    collection: collectionConfig,
                    context: req.context,
                    data,
                    doc: originalDoc,
                    global: null,
                    operation: 'update',
                    overrideAccess,
                    req
                });
                // /////////////////////////////////////
                // beforeValidate - Collection
                // /////////////////////////////////////
                await collectionConfig.hooks.beforeValidate.reduce(async (priorHook, hook)=>{
                    await priorHook;
                    data = await hook({
                        collection: collectionConfig,
                        context: req.context,
                        data,
                        operation: 'update',
                        originalDoc,
                        req
                    }) || data;
                }, Promise.resolve());
                // /////////////////////////////////////
                // Write files to local storage
                // /////////////////////////////////////
                if (!collectionConfig.upload.disableLocalStorage) {
                    await uploadFiles(payload, filesToUpload, req);
                }
                // /////////////////////////////////////
                // beforeChange - Collection
                // /////////////////////////////////////
                await collectionConfig.hooks.beforeChange.reduce(async (priorHook, hook)=>{
                    await priorHook;
                    data = await hook({
                        collection: collectionConfig,
                        context: req.context,
                        data,
                        operation: 'update',
                        originalDoc,
                        req
                    }) || data;
                }, Promise.resolve());
                // /////////////////////////////////////
                // beforeChange - Fields
                // /////////////////////////////////////
                let result = await beforeChange({
                    id,
                    collection: collectionConfig,
                    context: req.context,
                    data,
                    doc: originalDoc,
                    docWithLocales: doc,
                    global: null,
                    operation: 'update',
                    req,
                    skipValidation: shouldSaveDraft && collectionConfig.versions.drafts && !collectionConfig.versions.drafts.validate && data._status !== 'published'
                });
                // /////////////////////////////////////
                // Update
                // /////////////////////////////////////
                if (!shouldSaveDraft || data._status === 'published') {
                    result = await req.payload.db.updateOne({
                        id,
                        collection: collectionConfig.slug,
                        data: result,
                        locale,
                        req
                    });
                }
                // /////////////////////////////////////
                // Create version
                // /////////////////////////////////////
                if (collectionConfig.versions) {
                    result = await saveVersion({
                        id,
                        collection: collectionConfig,
                        docWithLocales: {
                            ...result,
                            createdAt: doc.createdAt
                        },
                        payload,
                        req
                    });
                }
                // /////////////////////////////////////
                // afterRead - Fields
                // /////////////////////////////////////
                result = await afterRead({
                    collection: collectionConfig,
                    context: req.context,
                    depth,
                    doc: result,
                    draft: draftArg,
                    fallbackLocale: null,
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
                        doc: result,
                        req
                    }) || result;
                }, Promise.resolve());
                // /////////////////////////////////////
                // afterChange - Fields
                // /////////////////////////////////////
                result = await afterChange({
                    collection: collectionConfig,
                    context: req.context,
                    data,
                    doc: result,
                    global: null,
                    operation: 'update',
                    previousDoc: originalDoc,
                    req
                });
                // /////////////////////////////////////
                // afterChange - Collection
                // /////////////////////////////////////
                await collectionConfig.hooks.afterChange.reduce(async (priorHook, hook)=>{
                    await priorHook;
                    result = await hook({
                        collection: collectionConfig,
                        context: req.context,
                        doc: result,
                        operation: 'update',
                        previousDoc: originalDoc,
                        req
                    }) || result;
                }, Promise.resolve());
                await unlinkTempFiles({
                    collectionConfig,
                    config,
                    req
                });
                // /////////////////////////////////////
                // Return results
                // /////////////////////////////////////
                return result;
            } catch (error) {
                errors.push({
                    id,
                    message: error.message
                });
            }
            return null;
        });
        const awaitedDocs = await Promise.all(promises);
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
            operation: 'update',
            result
        });
        if (shouldCommit) await commitTransaction(req);
        return result;
    } catch (error) {
        await killTransaction(args.req);
        throw error;
    }
};

//# sourceMappingURL=update.js.map