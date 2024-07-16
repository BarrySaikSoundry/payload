import { findVersionsOperationGlobal, isolateObjectProperty } from 'payload';
export default function findVersionsResolver(globalConfig) {
    return async function resolver(_, args, context) {
        const options = {
            depth: 0,
            globalConfig,
            limit: args.limit,
            page: args.page,
            req: isolateObjectProperty(context.req, 'transactionID'),
            sort: args.sort,
            where: args.where
        };
        const result = await findVersionsOperationGlobal(options);
        return result;
    };
}

//# sourceMappingURL=findVersions.js.map