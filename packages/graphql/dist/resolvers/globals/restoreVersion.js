import { isolateObjectProperty, restoreVersionOperationGlobal } from 'payload';
export default function restoreVersionResolver(globalConfig) {
    return async function resolver(_, args, context) {
        const options = {
            id: args.id,
            depth: 0,
            globalConfig,
            req: isolateObjectProperty(context.req, 'transactionID')
        };
        const result = await restoreVersionOperationGlobal(options);
        return result;
    };
}

//# sourceMappingURL=restoreVersion.js.map