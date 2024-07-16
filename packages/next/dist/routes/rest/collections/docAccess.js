import httpStatus from 'http-status';
import { docAccessOperation } from 'payload';
import { headersWithCors } from '../../../utilities/headersWithCors.js';
export const docAccess = async ({ id, collection, req })=>{
    const result = await docAccessOperation({
        id,
        collection,
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