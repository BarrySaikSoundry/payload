import httpStatus from 'http-status';
import { docAccessOperationGlobal } from 'payload';
import { headersWithCors } from '../../../utilities/headersWithCors.js';
export const docAccess = async ({ globalConfig, req })=>{
    const result = await docAccessOperationGlobal({
        globalConfig,
        req
    });
    return Response.json(result, {
        headers: headersWithCors({
            headers: new Headers(),
            req
        }),
        status: httpStatus.OK
    });
};

//# sourceMappingURL=docAccess.js.map