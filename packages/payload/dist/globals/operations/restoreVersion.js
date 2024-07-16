import executeAccess from '../../auth/executeAccess.js';
import { NotFound } from '../../errors/index.js';
import { afterChange } from '../../fields/hooks/afterChange/index.js';
import { afterRead } from '../../fields/hooks/afterRead/index.js';
import { commitTransaction } from '../../utilities/commitTransaction.js';
import { initTransaction } from '../../utilities/initTransaction.js';
import { killTransaction } from '../../utilities/killTransaction.js';
export const restoreVersionOperation = async (args)=>{
    const { id, depth, globalConfig, overrideAccess, req: { fallbackLocale, locale, payload }, req, showHiddenFields } = args;
    try {
        const shouldCommit = await initTransaction(req);
        // /////////////////////////////////////
        // Access
        // /////////////////////////////////////
        if (!overrideAccess) {
            await executeAccess({
                req
            }, globalConfig.access.update);
        }
        // /////////////////////////////////////
        // Retrieve original raw version
        // /////////////////////////////////////
        const { docs: versionDocs } = await payload.db.findGlobalVersions({
            global: globalConfig.slug,
            limit: 1,
            req,
            where: {
                id: {
                    equals: id
                }
            }
        });
        if (!versionDocs || versionDocs.length === 0) {
            throw new NotFound(req.t);
        }
        const rawVersion = versionDocs[0];
        // Patch globalType onto version doc
        rawVersion.version.globalType = globalConfig.slug;
        // /////////////////////////////////////
        // fetch previousDoc
        // /////////////////////////////////////
        const previousDoc = await payload.findGlobal({
            slug: globalConfig.slug,
            depth,
            req
        });
        // /////////////////////////////////////
        // Update global
        // /////////////////////////////////////
        const global = await payload.db.findGlobal({
            slug: globalConfig.slug,
            req
        });
        let result = rawVersion.version;
        if (global) {
            result = await payload.db.updateGlobal({
                slug: globalConfig.slug,
                data: result,
                req
            });
        } else {
            result = await payload.db.createGlobal({
                slug: globalConfig.slug,
                data: result,
                req
            });
        }
        // /////////////////////////////////////
        // afterRead - Fields
        // /////////////////////////////////////
        result = await afterRead({
            collection: null,
            context: req.context,
            depth,
            doc: result,
            draft: undefined,
            fallbackLocale,
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
            data: result,
            doc: result,
            global: globalConfig,
            operation: 'update',
            previousDoc,
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
                previousDoc,
                req
            }) || result;
        }, Promise.resolve());
        if (shouldCommit) await commitTransaction(req);
        return result;
    } catch (error) {
        await killTransaction(req);
        throw error;
    }
};

//# sourceMappingURL=restoreVersion.js.map