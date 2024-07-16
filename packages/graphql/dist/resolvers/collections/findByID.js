import { findByIDOperation, isolateObjectProperty } from 'payload';
export function findByIDResolver(collection) {
    return async function resolver(_, args, context) {
        let { req } = context;
        const locale = req.locale;
        const fallbackLocale = req.fallbackLocale;
        req = isolateObjectProperty(req, 'locale');
        req = isolateObjectProperty(req, 'fallbackLocale');
        req.locale = args.locale || locale;
        req.fallbackLocale = args.fallbackLocale || fallbackLocale;
        if (!req.query) req.query = {};
        const draft = args.draft ?? req.query?.draft === 'false' ? false : req.query?.draft === 'true' ? true : undefined;
        if (typeof draft === 'boolean') req.query.draft = String(draft);
        context.req = req;
        const options = {
            id: args.id,
            collection,
            depth: 0,
            draft: args.draft,
            req: isolateObjectProperty(req, 'transactionID')
        };
        const result = await findByIDOperation(options);
        return result;
    };
}

//# sourceMappingURL=findByID.js.map