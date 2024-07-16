import { meta } from '../../utilities/meta.js';
export const generateVerifyMetadata = async ({ config, i18n: { t } })=>meta({
        description: t('authentication:verifyUser'),
        keywords: t('authentication:verify'),
        serverURL: config.serverURL,
        title: t('authentication:verify'),
        ...config.admin.meta || {}
    });

//# sourceMappingURL=meta.js.map