import httpStatus from 'http-status';
import { accessOperation } from 'payload';
import { headersWithCors } from '../../../utilities/headersWithCors.js';
export const access = async ({ req })=>{
    const headers = headersWithCors({
        headers: new Headers(),
        req
    });
    try {
        const results = await accessOperation({
            req
        });
        return Response.json(results, {
            headers,
            status: httpStatus.OK
        });
    } catch (e) {
        return Response.json({
            error: e
        }, {
            headers,
            status: httpStatus.INTERNAL_SERVER_ERROR
        });
    }
};

//# sourceMappingURL=access.js.map