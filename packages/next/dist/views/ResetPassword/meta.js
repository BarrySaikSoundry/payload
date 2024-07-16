import { meta } from '../../utilities/meta.js';
export const generateResetPasswordMetadata = async ({ config, i18n: { t } })=>meta({
        description: t('authentication:resetPassword'),
        keywords: t('authentication:resetPassword'),
        serverURL: config.serverURL,
        title: t('authentication:resetPassword'),
        ...config.admin.meta || {}
    });

//# sourceMappingURL=meta.js.map