import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FieldLabel } from '@payloadcms/ui';
import React from 'react';
import { ToggleTheme } from '../ToggleTheme/index.js';
import { LanguageSelector } from './LanguageSelector.js';
const baseClass = 'payload-settings';
export const Settings = (props)=>{
    const { className, i18n, languageOptions } = props;
    return /*#__PURE__*/ _jsxs("div", {
        className: [
            baseClass,
            className
        ].filter(Boolean).join(' '),
        children: [
            /*#__PURE__*/ _jsx("h3", {
                children: i18n.t('general:payloadSettings')
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: `${baseClass}__language`,
                children: [
                    /*#__PURE__*/ _jsx(FieldLabel, {
                        htmlFor: "language-select",
                        label: i18n.t('general:language')
                    }),
                    /*#__PURE__*/ _jsx(LanguageSelector, {
                        languageOptions: languageOptions
                    })
                ]
            }),
            /*#__PURE__*/ _jsx(ToggleTheme, {})
        ]
    });
};

//# sourceMappingURL=index.js.map