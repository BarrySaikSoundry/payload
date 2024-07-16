import { meta } from '../../utilities/meta.js';
export const generateAccountMetadata = async ({ config, i18n: { t } })=>meta({
        description: `${t('authentication:accountOfCurrentUser')}`,
        keywords: `${t('authentication:account')}`,
        serverURL: config.serverURL,
        title: t('authentication:account'),
        ...config.admin.meta || {}
    });

//# sourceMappingURL=meta.js.map