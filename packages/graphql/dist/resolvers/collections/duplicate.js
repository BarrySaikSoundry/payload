import { duplicateOperation, isolateObjectProperty } from 'payload';
export default function duplicateResolver(collection) {
    return async function resolver(_, args, context) {
        const { req } = context;
        const locale = req.locale;
        const fallbackLocale = req.fallbackLocale;
        req.locale = args.locale || locale;
        req.fallbackLocale = args.fallbackLocale || fallbackLocale;
        context.req = req;
        const options = {
            id: args.id,
            collection,
            depth: 0,
            draft: args.draft,
            req: isolateObjectProperty(req, 'transactionID')
        };
        const result = await duplicateOperation(options);
        return result;
    };
}

//# sourceMappingURL=duplicate.js.map