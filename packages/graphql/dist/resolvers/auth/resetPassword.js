import { generatePayloadCookie, isolateObjectProperty, resetPasswordOperation } from 'payload';
function resetPasswordResolver(collection) {
    async function resolver(_, args, context) {
        if (args.locale) context.req.locale = args.locale;
        if (args.fallbackLocale) context.req.fallbackLocale = args.fallbackLocale;
        const options = {
            api: 'GraphQL',
            collection,
            data: args,
            depth: 0,
            req: isolateObjectProperty(context.req, 'transactionID')
        };
        const result = await resetPasswordOperation(options);
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
export default resetPasswordResolver;

//# sourceMappingURL=resetPassword.js.map