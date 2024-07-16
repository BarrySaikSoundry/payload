export const getTranslation = (label, i18n) => {
    // If it's a Record, look for translation. If string or React Element, pass through
    if (typeof label === 'object' && !Object.prototype.hasOwnProperty.call(label, '$$typeof')) {
        if (label[i18n.language]) {
            return label[i18n.language];
        }
        let fallbacks = [];
        if (typeof i18n.fallbackLanguage === 'string') {
            fallbacks = [i18n.fallbackLanguage];
        }
        else if (Array.isArray(i18n.fallbackLanguage)) {
            fallbacks = i18n.fallbackLanguage;
        }
        const fallbackLang = fallbacks.find((language) => label[language]);
        return fallbackLang && label[fallbackLang] ? label[fallbackLang] : label[Object.keys(label)[0]];
    }
    if (typeof label === 'function') {
        return label({ t: i18n.t });
    }
    // If it's a React Element or string, then we should just pass it through
    return label;
};
//# sourceMappingURL=getTranslation.js.map