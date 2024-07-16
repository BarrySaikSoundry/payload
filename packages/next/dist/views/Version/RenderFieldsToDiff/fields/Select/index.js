import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import React from 'react';
import Label from '../../Label/index.js';
import { diffStyles } from '../styles.js';
import { DiffViewer } from './DiffViewer/index.js';
const baseClass = 'select-diff';
const getOptionsToRender = (value, options, hasMany)=>{
    if (hasMany && Array.isArray(value)) {
        return value.map((val)=>options.find((option)=>(typeof option === 'string' ? option : option.value) === val) || String(val));
    }
    return options.find((option)=>(typeof option === 'string' ? option : option.value) === value) || String(value);
};
const getTranslatedOptions = (options, i18n)=>{
    if (Array.isArray(options)) {
        return options.map((option)=>typeof option === 'string' ? option : getTranslation(option.label, i18n)).join(', ');
    }
    return typeof options === 'string' ? options : getTranslation(options.label, i18n);
};
const Select = ({ comparison, diffMethod, field, i18n, locale, version })=>{
    let placeholder = '';
    if (version === comparison) placeholder = `[${i18n.t('general:noValue')}]`;
    const options = 'options' in field.fieldComponentProps && field.fieldComponentProps.options;
    const comparisonToRender = typeof comparison !== 'undefined' ? getTranslatedOptions(getOptionsToRender(comparison, options, field.hasMany), i18n) : placeholder;
    const versionToRender = typeof version !== 'undefined' ? getTranslatedOptions(getOptionsToRender(version, options, field.hasMany), i18n) : placeholder;
    return /*#__PURE__*/ _jsxs("div", {
        className: baseClass,
        children: [
            /*#__PURE__*/ _jsxs(Label, {
                children: [
                    locale && /*#__PURE__*/ _jsx("span", {
                        className: `${baseClass}__locale-label`,
                        children: locale
                    }),
                    'label' in field && getTranslation(field.label || '', i18n)
                ]
            }),
            /*#__PURE__*/ _jsx(DiffViewer, {
                comparisonToRender: comparisonToRender,
                diffMethod: diffMethod,
                diffStyles: diffStyles,
                placeholder: placeholder,
                versionToRender: versionToRender
            })
        ]
    });
};
export default Select;

//# sourceMappingURL=index.js.map