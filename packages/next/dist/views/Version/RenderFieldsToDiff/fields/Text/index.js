import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import React from 'react';
import Label from '../../Label/index.js';
import { diffStyles } from '../styles.js';
import { DiffViewer } from './DiffViewer/index.js';
const baseClass = 'text-diff';
const Text = ({ comparison, diffMethod, field, i18n, isRichText = false, locale, version })=>{
    let placeholder = '';
    if (version === comparison) placeholder = `[${i18n.t('general:noValue')}]`;
    let versionToRender = version;
    let comparisonToRender = comparison;
    if (isRichText) {
        if (typeof version === 'object') versionToRender = JSON.stringify(version, null, 2);
        if (typeof comparison === 'object') comparisonToRender = JSON.stringify(comparison, null, 2);
    }
    return /*#__PURE__*/ _jsxs("div", {
        className: baseClass,
        children: [
            /*#__PURE__*/ _jsxs(Label, {
                children: [
                    locale && /*#__PURE__*/ _jsx("span", {
                        className: `${baseClass}__locale-label`,
                        children: locale
                    }),
                    'label' in field.fieldComponentProps && typeof field.fieldComponentProps.label !== 'function' && getTranslation(field.fieldComponentProps.label || '', i18n)
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
export default Text;

//# sourceMappingURL=index.js.map