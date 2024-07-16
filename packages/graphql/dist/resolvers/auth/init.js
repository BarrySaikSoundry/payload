import { initOperation, isolateObjectProperty } from 'payload';
function initResolver(collection) {
    async function resolver(_, args, context) {
        const options = {
            collection,
            req: isolateObjectProperty(context.req, 'transactionID')
        };
        return initOperation(options);
    }
    return resolver;
}
export default initResolver;

//# sourceMappingURL=init.js.map