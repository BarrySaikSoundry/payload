import { meta } from '../../utilities/meta.js';
export const generateCreateFirstUserMetadata = async ({ config, i18n: { t } })=>meta({
        description: t('authentication:createFirstUser'),
        keywords: t('general:create'),
        serverURL: config.serverURL,
        title: t('authentication:createFirstUser'),
        ...config.admin.meta || {}
    });

//# sourceMappingURL=meta.js.map