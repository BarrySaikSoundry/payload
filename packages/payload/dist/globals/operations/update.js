import executeAccess from '../../auth/executeAccess.js';
import { afterChange } from '../../fields/hooks/afterChange/index.js';
import { afterRead } from '../../fields/hooks/afterRead/index.js';
import { beforeChange } from '../../fields/hooks/beforeChange/index.js';
import { beforeValidate } from '../../fields/hooks/beforeValidate/index.js';
import { commitTransaction } from '../../utilities/commitTransaction.js';
import { initTransaction } from '../../utilities/initTransaction.js';
import { killTransaction } from '../../utilities/killTransaction.js';
import { getLatestGlobalVersion } from '../../versions/getLatestGlobalVersion.js';
import { saveVersion } from '../../versions/saveVersion.js';
export const updateOperation = async (args)=>{
    const { slug, autosave, depth, draft: draftArg, globalConfig, overrideAccess, req: { fallbackLocale, locale, payload }, req, showHiddenFields } = args;
    try {
        const shouldCommit = await initTransaction(req);
        let { data } = args;
        const shouldSaveDraft = Boolean(draftArg && globalConfig.versions?.drafts);
        // /////////////////////////////////////
        // 1. Retrieve and execute access
        // /////////////////////////////////////
        const accessResults = !overrideAccess ? await executeAccess({
            data,
            req
        }, globalConfig.access.update) : true;
        // /////////////////////////////////////
        // Retrieve document
        // /////////////////////////////////////
        const query = overrideAccess ? undefined : accessResults;
        // /////////////////////////////////////
        // 2. Retrieve document
        // /////////////////////////////////////
        const { global, globalExists } = await getLatestGlobalVersion({
            slug,
            config: globalConfig,
            locale,
            payload,
            req,
            where: query
        });
        let globalJSON = {};
        if (global) {
            globalJSON = JSON.parse(JSON.stringify(global));
            if (globalJSON._id) {
                delete globalJSON._id;
            }
        }
        const originalDoc = await afterRead({
            collection: null,
            context: req.context,
            depth: 0,
            doc: globalJSON,
            draft: draftArg,
            fallbackLocale,
            global: globalConfig,
            locale,
            overrideAccess: true,
            req,
            showHiddenFields
        });
        // /////////////////////////////////////
        // beforeValidate - Fields
        // /////////////////////////////////////
        data = await beforeValidate({
            collection: null,
            context: req.context,
            data,
            doc: originalDoc,
            global: globalConfig,
            operation: 'update',
            overrideAccess,
            req
        });
        // /////////////////////////////////////
        // beforeValidate - Global
        // /////////////////////////////////////
        await globalConfig.hooks.beforeValidate.reduce(async (priorHook, hook)=>{
            await priorHook;
            data = await hook({
                context: req.context,
                data,
                global: globalConfig,
                originalDoc,
                req
            }) || data;
        }, Promise.resolve());
        // /////////////////////////////////////
        // beforeChange - Global
        // /////////////////////////////////////
        await globalConfig.hooks.beforeChange.reduce(async (priorHook, hook)=>{
            await priorHook;
            data = await hook({
                context: req.context,
                data,
                global: globalConfig,
                originalDoc,
                req
            }) || data;
        }, Promise.resolve());
        // /////////////////////////////////////
        // beforeChange - Fields
        // /////////////////////////////////////
        let result = await beforeChange({
            collection: null,
            context: req.context,
            data,
            doc: originalDoc,
            docWithLocales: globalJSON,
            global: globalConfig,
            operation: 'update',
            req,
            skipValidation: shouldSaveDraft && globalConfig.versions.drafts && !globalConfig.versions.drafts.validate
        });
        // /////////////////////////////////////
        // Update
        // /////////////////////////////////////
        if (!shouldSaveDraft) {
            if (globalExists) {
                result = await payload.db.updateGlobal({
                    slug,
                    data: result,
                    req
                });
            } else {
                result = await payload.db.createGlobal({
                    slug,
                    data: result,
                    req
                });
            }
        }
        // /////////////////////////////////////
        // Create version
        // /////////////////////////////////////
        if (globalConfig.versions) {
            const { globalType } = result;
            result = await saveVersion({
                autosave,
                docWithLocales: {
                    ...result,
                    createdAt: result.createdAt,
                    updatedAt: result.updatedAt
                },
                draft: shouldSaveDraft,
                global: globalConfig,
                payload,
                req
            });
            result.globalType = globalType;
        }
        // /////////////////////////////////////
        // afterRead - Fields
        // /////////////////////////////////////
        result = await afterRead({
            collection: null,
            context: req.context,
            depth,
            doc: result,
            draft: draftArg,
            fallbackLocale: null,
            global: globalConfig,
            locale,
            overrideAccess,
            req,
            showHiddenFields
        });
        // /////////////////////////////////////
        // afterRead - Global
        // /////////////////////////////////////
        await globalConfig.hooks.afterRead.reduce(async (priorHook, hook)=>{
            await priorHook;
            result = await hook({
                context: req.context,
                doc: result,
                global: globalConfig,
                req
            }) || result;
        }, Promise.resolve());
        // /////////////////////////////////////
        // afterChange - Fields
        // /////////////////////////////////////
        result = await afterChange({
            collection: null,
            context: req.context,
            data,
            doc: result,
            global: globalConfig,
            operation: 'update',
            previousDoc: originalDoc,
            req
        });
        // /////////////////////////////////////
        // afterChange - Global
        // /////////////////////////////////////
        await globalConfig.hooks.afterChange.reduce(async (priorHook, hook)=>{
            await priorHook;
            result = await hook({
                context: req.context,
                doc: result,
                global: globalConfig,
                previousDoc: originalDoc,
                req
            }) || result;
        }, Promise.resolve());
        // /////////////////////////////////////
        // Return results
        // /////////////////////////////////////
        if (shouldCommit) await commitTransaction(req);
        return result;
    } catch (error) {
        await killTransaction(req);
        throw error;
    }
};

//# sourceMappingURL=update.js.map