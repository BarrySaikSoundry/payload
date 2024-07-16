import { buildFormState } from '@payloadcms/ui/utilities/buildFormState';
import { reduceFieldsToValues } from 'payload/shared';
export const getDocumentData = async (args)=>{
    const { id, collectionConfig, globalConfig, locale, req } = args;
    try {
        const formState = await buildFormState({
            req: {
                ...req,
                data: {
                    id,
                    collectionSlug: collectionConfig?.slug,
                    globalSlug: globalConfig?.slug,
                    locale: locale?.code,
                    operation: collectionConfig && id || globalConfig ? 'update' : 'create',
                    schemaPath: collectionConfig?.slug || globalConfig?.slug
                }
            }
        });
        const data = reduceFieldsToValues(formState, true);
        return {
            data,
            formState
        };
    } catch (error) {
        console.error('Error getting document data', error) // eslint-disable-line no-console
        ;
        return {};
    }
};

//# sourceMappingURL=getDocumentData.js.map