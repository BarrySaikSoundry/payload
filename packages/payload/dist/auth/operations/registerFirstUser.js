import { Forbidden } from '../../errors/index.js';
import { commitTransaction } from '../../utilities/commitTransaction.js';
import { initTransaction } from '../../utilities/initTransaction.js';
import { killTransaction } from '../../utilities/killTransaction.js';
export const registerFirstUserOperation = async (args)=>{
    const { collection: { config, config: { slug, auth: { verify } } }, data, req, req: { payload } } = args;
    try {
        const shouldCommit = await initTransaction(req);
        const doc = await payload.db.findOne({
            collection: config.slug,
            req
        });
        if (doc) throw new Forbidden(req.t);
        // /////////////////////////////////////
        // Register first user
        // /////////////////////////////////////
        const result = await payload.create({
            collection: slug,
            data,
            overrideAccess: true,
            req
        });
        // auto-verify (if applicable)
        if (verify) {
            await payload.update({
                id: result.id,
                collection: slug,
                data: {
                    _verified: true
                },
                req
            });
        }
        // /////////////////////////////////////
        // Log in new user
        // /////////////////////////////////////
        const { exp, token } = await payload.login({
            ...args,
            collection: slug,
            req
        });
        if (shouldCommit) await commitTransaction(req);
        return {
            exp,
            token,
            user: result
        };
    } catch (error) {
        await killTransaction(req);
        throw error;
    }
};

//# sourceMappingURL=registerFirstUser.js.map