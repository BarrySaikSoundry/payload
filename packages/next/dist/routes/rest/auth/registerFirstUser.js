import httpStatus from 'http-status';
import { generatePayloadCookie, registerFirstUserOperation } from 'payload';
import { headersWithCors } from '../../../utilities/headersWithCors.js';
export const registerFirstUser = async ({ collection, req })=>{
    const { data, t } = req;
    const authData = collection.config.auth?.loginWithUsername ? {
        email: typeof req.data?.email === 'string' ? req.data.email : '',
        password: typeof req.data?.password === 'string' ? req.data.password : '',
        username: typeof req.data?.username === 'string' ? req.data.username : ''
    } : {
        email: typeof req.data?.email === 'string' ? req.data.email : '',
        password: typeof req.data?.password === 'string' ? req.data.password : ''
    };
    const result = await registerFirstUserOperation({
        collection,
        data: {
            ...data,
            ...authData
        },
        req
    });
    const cookie = generatePayloadCookie({
        collectionConfig: collection.config,
        payload: req.payload,
        token: result.token
    });
    return Response.json({
        exp: result.exp,
        message: t('authentication:successfullyRegisteredFirstUser'),
        token: result.token,
        user: result.user
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

//# sourceMappingURL=registerFirstUser.js.map