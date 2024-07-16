import { isolateObjectProperty, restoreVersionOperation } from 'payload';
export default function restoreVersionResolver(collection) {
    async function resolver(_, args, context) {
        const options = {
            id: args.id,
            collection,
            depth: 0,
            req: isolateObjectProperty(context.req, 'transactionID')
        };
        const result = await restoreVersionOperation(options);
        return result;
    }
    return resolver;
}

//# sourceMappingURL=restoreVersion.js.map