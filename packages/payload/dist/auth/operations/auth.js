import { commitTransaction } from '../../utilities/commitTransaction.js';
import { initTransaction } from '../../utilities/initTransaction.js';
import { killTransaction } from '../../utilities/killTransaction.js';
import { executeAuthStrategies } from '../executeAuthStrategies.js';
import { getAccessResults } from '../getAccessResults.js';
export const auth = async (args)=>{
    const { headers } = args;
    const req = args.req;
    const { payload } = req;
    try {
        const shouldCommit = await initTransaction(req);
        const { responseHeaders, user } = await executeAuthStrategies({
            headers,
            payload
        });
        req.user = user;
        req.responseHeaders = responseHeaders;
        const permissions = await getAccessResults({
            req
        });
        if (shouldCommit) await commitTransaction(req);
        return {
            permissions,
            responseHeaders,
            user
        };
    } catch (error) {
        await killTransaction(req);
        throw error;
    }
};

//# sourceMappingURL=auth.js.map