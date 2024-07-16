import httpStatus from 'http-status';
import { generatePayloadCookie, loginOperation } from 'payload';
import { isNumber } from 'payload/shared';
import { headersWithCors } from '../../../utilities/headersWithCors.js';
export const login = async ({ collection, req })=>{
    const { searchParams, t } = req;
    const depth = searchParams.get('depth');
    const authData = collection.config.auth?.loginWithUsername ? {
        email: typeof req.data?.email === 'string' ? req.data.email : '',
        password: typeof req.data?.password === 'string' ? req.data.password : '',
        username: typeof req.data?.username === 'string' ? req.data.username : ''
    } : {
        email: typeof req.data?.email === 'string' ? req.data.email : '',
        password: typeof req.data?.password === 'string' ? req.data.password : ''
    };
    const result = await loginOperation({
        collection,
        data: authData,
        depth: isNumber(depth) ? Number(depth) : undefined,
        req
    });
    const cookie = generatePayloadCookie({
        collectionConfig: collection.config,
        payload: req.payload,
        token: result.token
    });
    if (collection.config.auth.removeTokenFromResponses) {
        delete result.token;
    }
    return Response.json({
        message: t('authentication:passed'),
        ...result
    }, {
        headers: headersWithCors({
            headers: new Headers({
                'Set-Cookie': cookie
            }),
            req
        }),
        status: httpStatus.OK
    });
};

//# sourceMappingURL=login.js.map