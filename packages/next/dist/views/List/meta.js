import { getTranslation } from '@payloadcms/translations';
import { meta } from '../../utilities/meta.js';
export const generateListMetadata = async (args)=>{
    const { collectionConfig, config, i18n } = args;
    let title = '';
    const description = '';
    const keywords = '';
    if (collectionConfig) {
        title = getTranslation(collectionConfig.labels.plural, i18n);
    }
    return meta({
        ...config.admin.meta || {},
        description,
        keywords,
        serverURL: config.serverURL,
        title,
        ...collectionConfig.admin.meta || {}
    });
};

//# sourceMappingURL=meta.js.map