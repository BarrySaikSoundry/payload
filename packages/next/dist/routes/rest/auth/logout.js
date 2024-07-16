import httpStatus from 'http-status';
import { generateExpiredPayloadCookie, logoutOperation } from 'payload';
import { headersWithCors } from '../../../utilities/headersWithCors.js';
export const logout = async ({ collection, req })=>{
    const { t } = req;
    const result = await logoutOperation({
        collection,
        req
    });
    const headers = headersWithCors({
        headers: new Headers(),
        req
    });
    if (!result) {
        return Response.json({
            message: t('error:logoutFailed')
        }, {
            headers,
            status: httpStatus.BAD_REQUEST
        });
    }
    const expiredCookie = generateExpiredPayloadCookie({
        collectionConfig: collection.config,
        payload: req.payload
    });
    headers.set('Set-Cookie', expiredCookie);
    return Response.json({
        message: t('authentication:logoutSuccessful')
    }, {
        headers,
        status: httpStatus.OK
    });
};

//# sourceMappingURL=logout.js.map