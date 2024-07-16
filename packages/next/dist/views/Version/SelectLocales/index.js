'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ReactSelect, useLocale, useTranslation } from '@payloadcms/ui';
import React from 'react';
const baseClass = 'select-version-locales';
export const SelectLocales = ({ onChange, options, value })=>{
    const { t } = useTranslation();
    const { code } = useLocale();
    const format = (items)=>{
        return items.map((item)=>{
            if (typeof item.label === 'string') return item;
            if (typeof item.label !== 'string' && item.label[code]) {
                return {
                    label: item.label[code],
                    value: item.value
                };
            }
        });
    };
    return /*#__PURE__*/ _jsxs("div", {
        className: baseClass,
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: `${baseClass}__label`,
                children: t('version:showLocales')
            }),
            /*#__PURE__*/ _jsx(ReactSelect, {
                isMulti: true,
                onChange: onChange,
                options: format(options),
                placeholder: t('version:selectLocales'),
                value: format(value)
            })
        ]
    });
};

//# sourceMappingURL=index.js.map