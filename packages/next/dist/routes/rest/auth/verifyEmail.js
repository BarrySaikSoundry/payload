import httpStatus from 'http-status';
import { verifyEmailOperation } from 'payload';
import { headersWithCors } from '../../../utilities/headersWithCors.js';
export const verifyEmail = async ({ id, collection, req })=>{
    const { t } = req;
    await verifyEmailOperation({
        collection,
        req,
        token: id
    });
    return Response.json({
        message: t('authentication:accountVerified')
    }, {
        headers: headersWithCors({
            headers: new Headers(),
            req
        }),
        status: httpStatus.OK
    });
};

//# sourceMappingURL=verifyEmail.js.map