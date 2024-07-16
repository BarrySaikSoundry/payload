import httpStatus from 'http-status';
import { extractJWT, meOperation } from 'payload';
import { headersWithCors } from '../../../utilities/headersWithCors.js';
export const me = async ({ collection, req })=>{
    const currentToken = extractJWT(req);
    const result = await meOperation({
        collection,
        currentToken,
        req
    });
    if (collection.config.auth.removeTokenFromResponses) {
        delete result.token;
    }
    return Response.json({
        ...result,
        message: req.t('authentication:account')
    }, {
        headers: headersWithCors({
            headers: new Headers(),
            req
        }),
        status: httpStatus.OK
    });
};

//# sourceMappingURL=me.js.map