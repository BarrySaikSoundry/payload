import httpStatus from 'http-status';
import { unlockOperation } from 'payload';
import { headersWithCors } from '../../../utilities/headersWithCors.js';
export const unlock = async ({ collection, req })=>{
    const { t } = req;
    await unlockOperation({
        collection,
        data: {
            email: req.data.email
        },
        req
    });
    return Response.json({
        message: t('general:success')
    }, {
        headers: headersWithCors({
            headers: new Headers(),
            req
        }),
        status: httpStatus.OK
    });
};

//# sourceMappingURL=unlock.js.map