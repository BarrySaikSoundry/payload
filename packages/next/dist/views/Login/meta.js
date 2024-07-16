import { meta } from '../../utilities/meta.js';
export const generateLoginMetadata = async ({ config, i18n: { t } })=>meta({
        description: `${t('authentication:login')}`,
        keywords: `${t('authentication:login')}`,
        serverURL: config.serverURL,
        title: t('authentication:login'),
        ...config.admin.meta || {}
    });

//# sourceMappingURL=meta.js.map