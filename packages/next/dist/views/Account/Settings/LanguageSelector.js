'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { ReactSelect, useTranslation } from '@payloadcms/ui';
import React from 'react';
export const LanguageSelector = (props)=>{
    const { languageOptions } = props;
    const { i18n, switchLanguage } = useTranslation();
    return /*#__PURE__*/ _jsx(ReactSelect, {
        inputId: "language-select",
        isClearable: false,
        onChange: async (option)=>{
            await switchLanguage(option.value);
        },
        options: languageOptions,
        value: languageOptions.find((language)=>language.value === i18n.language)
    });
};

//# sourceMappingURL=LanguageSelector.js.map