import { generatePayloadCookie, isolateObjectProperty, loginOperation } from 'payload';
function loginResolver(collection) {
    async function resolver(_, args, context) {
        const options = {
            collection,
            data: {
                email: args.email,
                password: args.password,
                username: args.username
            },
            depth: 0,
            req: isolateObjectProperty(context.req, 'transactionID')
        };
        const result = await loginOperation(options);
        const cookie = generatePayloadCookie({
            collectionConfig: collection.config,
            payload: context.req.payload,
            token: result.token
        });
        context.headers['Set-Cookie'] = cookie;
        if (collection.config.auth.removeTokenFromResponses) {
            delete result.token;
        }
        return result;
    }
    return resolver;
}
export default loginResolver;

//# sourceMappingURL=login.js.map