import { getTranslation } from '@payloadcms/translations';
import { formatDate } from '../utilities/formatDate.js';
export const formatDocTitle = ({ collectionConfig, data, dateFormat: dateFormatFromConfig, fallback, globalConfig, i18n })=>{
    let title;
    if (collectionConfig) {
        const useAsTitle = collectionConfig?.admin?.useAsTitle;
        if (useAsTitle) {
            title = data?.[useAsTitle] || title;
            if (title) {
                const fieldConfig = collectionConfig.fields.find((f)=>'name' in f && f.name === useAsTitle);
                const isDate = fieldConfig?.type === 'date';
                if (isDate) {
                    const dateFormat = 'date' in fieldConfig.admin && fieldConfig?.admin?.date?.displayFormat || dateFormatFromConfig;
                    title = formatDate({
                        date: title,
                        i18n,
                        pattern: dateFormat
                    }) || title;
                }
            }
        }
    }
    if (globalConfig) {
        title = getTranslation(globalConfig?.label, i18n) || globalConfig?.slug;
    }
    if (!title) {
        title = fallback || `[${i18n.t('general:untitled')}]`;
    }
    return title;
};

//# sourceMappingURL=formatDocTitle.js.map