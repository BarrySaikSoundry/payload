import { getTranslation } from '@payloadcms/translations';
import { meta } from '../../utilities/meta.js';
export const generateMetadata = async ({ collectionConfig, config, globalConfig, i18n })=>{
    const entityLabel = collectionConfig ? getTranslation(collectionConfig.labels.singular, i18n) : globalConfig ? getTranslation(globalConfig.label, i18n) : '';
    const metaTitle = `API - ${entityLabel}`;
    const description = `API - ${entityLabel}`;
    return Promise.resolve(meta({
        ...config.admin.meta || {},
        description,
        keywords: 'API',
        serverURL: config.serverURL,
        title: metaTitle,
        ...collectionConfig?.admin.meta || {},
        ...globalConfig?.admin.meta || {}
    }));
};

//# sourceMappingURL=meta.js.map