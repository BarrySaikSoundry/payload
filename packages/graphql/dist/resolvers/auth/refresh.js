import { generatePayloadCookie, isolateObjectProperty, refreshOperation } from 'payload';
function refreshResolver(collection) {
    async function resolver(_, __, context) {
        const options = {
            collection,
            depth: 0,
            req: isolateObjectProperty(context.req, 'transactionID')
        };
        const result = await refreshOperation(options);
        const cookie = generatePayloadCookie({
            collectionConfig: collection.config,
            payload: context.req.payload,
            token: result.refreshedToken
        });
        context.headers['Set-Cookie'] = cookie;
        if (collection.config.auth.removeTokenFromResponses) {
            delete result.refreshedToken;
        }
        return result;
    }
    return resolver;
}
export default refreshResolver;

//# sourceMappingURL=refresh.js.map