import { forgotPasswordOperation, isolateObjectProperty } from 'payload';
function forgotPasswordResolver(collection) {
    async function resolver(_, args, context) {
        const options = {
            collection,
            data: {
                email: args.email,
                username: args.username
            },
            disableEmail: args.disableEmail,
            expiration: args.expiration,
            req: isolateObjectProperty(context.req, 'transactionID')
        };
        await forgotPasswordOperation(options);
        return true;
    }
    return resolver;
}
export default forgotPasswordResolver;

//# sourceMappingURL=forgotPassword.js.map