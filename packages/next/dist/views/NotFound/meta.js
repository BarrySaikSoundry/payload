import { meta } from '../../utilities/meta.js';
export const generateNotFoundMeta = async ({ config, i18n })=>meta({
        description: i18n.t('general:pageNotFound'),
        keywords: `404 ${i18n.t('general:notFound')}`,
        serverURL: config.serverURL,
        title: i18n.t('general:notFound')
    });

//# sourceMappingURL=meta.js.map