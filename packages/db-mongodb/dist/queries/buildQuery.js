import { QueryError } from 'payload';
import { parseParams } from './parseParams.js';
// This plugin asynchronously builds a list of Mongoose query constraints
// which can then be used in subsequent Mongoose queries.
const getBuildQueryPlugin = ({ collectionSlug, versionsFields } = {})=>{
    return function buildQueryPlugin(schema) {
        const modifiedSchema = schema;
        async function buildQuery({ globalSlug, locale, payload, where }) {
            let fields = versionsFields;
            if (!fields) {
                if (globalSlug) {
                    const globalConfig = payload.globals.config.find(({ slug })=>slug === globalSlug);
                    fields = globalConfig.fields;
                }
                if (collectionSlug) {
                    const collectionConfig = payload.collections[collectionSlug].config;
                    fields = collectionConfig.fields;
                }
            }
            const errors = [];
            const result = await parseParams({
                collectionSlug,
                fields,
                globalSlug,
                locale,
                payload,
                where
            });
            if (errors.length > 0) {
                throw new QueryError(errors);
            }
            return result;
        }
        modifiedSchema.statics.buildQuery = buildQuery;
    };
};
export default getBuildQueryPlugin;

//# sourceMappingURL=buildQuery.js.map