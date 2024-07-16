import { createOperation, isolateObjectProperty } from 'payload';
export default function createResolver(collection) {
    return async function resolver(_, args, context) {
        if (args.locale) {
            context.req.locale = args.locale;
        }
        const options = {
            collection,
            data: args.data,
            depth: 0,
            draft: args.draft,
            req: isolateObjectProperty(context.req, 'transactionID')
        };
        const result = await createOperation(options);
        return result;
    };
}

//# sourceMappingURL=create.js.map