import { extractJWT, isolateObjectProperty, meOperation } from 'payload';
function meResolver(collection) {
    async function resolver(_, args, context) {
        const currentToken = extractJWT(context.req);
        const options = {
            collection,
            currentToken,
            depth: 0,
            req: isolateObjectProperty(context.req, 'transactionID')
        };
        const result = await meOperation(options);
        if (collection.config.auth.removeTokenFromResponses) {
            delete result.token;
        }
        return result;
    }
    return resolver;
}
export default meResolver;

//# sourceMappingURL=me.js.map