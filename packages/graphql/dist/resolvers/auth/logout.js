import { generateExpiredPayloadCookie, isolateObjectProperty, logoutOperation } from 'payload';
function logoutResolver(collection) {
    async function resolver(_, args, context) {
        const options = {
            collection,
            req: isolateObjectProperty(context.req, 'transactionID')
        };
        const result = await logoutOperation(options);
        const expiredCookie = generateExpiredPayloadCookie({
            collectionConfig: collection.config,
            payload: context.req.payload
        });
        context.headers['Set-Cookie'] = expiredCookie;
        return result;
    }
    return resolver;
}
export default logoutResolver;

//# sourceMappingURL=logout.js.map