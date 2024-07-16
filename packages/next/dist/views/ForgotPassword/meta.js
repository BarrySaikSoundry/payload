import { meta } from '../../utilities/meta.js';
export const generateForgotPasswordMetadata = async ({ config, i18n: { t } })=>meta({
        description: t('authentication:forgotPassword'),
        keywords: t('authentication:forgotPassword'),
        title: t('authentication:forgotPassword'),
        ...config.admin.meta || {},
        serverURL: config.serverURL
    });

//# sourceMappingURL=meta.js.map