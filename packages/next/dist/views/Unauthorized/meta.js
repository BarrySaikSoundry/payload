import { meta } from '../../utilities/meta.js';
export const generateUnauthorizedMetadata = async ({ config, i18n: { t } })=>meta({
        description: t('error:unauthorized'),
        keywords: t('error:unauthorized'),
        serverURL: config.serverURL,
        title: t('error:unauthorized'),
        ...config.admin.meta || {}
    });

//# sourceMappingURL=meta.js.map