import { isolateObjectProperty, unlockOperation } from 'payload';
function unlockResolver(collection) {
    async function resolver(_, args, context) {
        const options = {
            collection,
            data: {
                email: args.email
            },
            req: isolateObjectProperty(context.req, 'transactionID')
        };
        const result = await unlockOperation(options);
        return result;
    }
    return resolver;
}
export default unlockResolver;

//# sourceMappingURL=unlock.js.map