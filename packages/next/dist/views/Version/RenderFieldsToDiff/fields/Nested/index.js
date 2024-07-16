import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import React from 'react';
import Label from '../../Label/index.js';
import RenderFieldsToDiff from '../../index.js';
const baseClass = 'nested-diff';
const Nested = ({ comparison, diffComponents, disableGutter = false, field, fieldMap, i18n, locale, locales, permissions, version })=>{
    return /*#__PURE__*/ _jsxs("div", {
        className: baseClass,
        children: [
            'label' in field.fieldComponentProps && field.fieldComponentProps.label && typeof field.fieldComponentProps.label !== 'function' && /*#__PURE__*/ _jsxs(Label, {
                children: [
                    locale && /*#__PURE__*/ _jsx("span", {
                        className: `${baseClass}__locale-label`,
                        children: locale
                    }),
                    getTranslation(field.fieldComponentProps.label, i18n)
                ]
            }),
            /*#__PURE__*/ _jsx("div", {
                className: [
                    `${baseClass}__wrap`,
                    !disableGutter && `${baseClass}__wrap--gutter`
                ].filter(Boolean).join(' '),
                children: /*#__PURE__*/ _jsx(RenderFieldsToDiff, {
                    comparison: comparison,
                    diffComponents: diffComponents,
                    fieldMap: fieldMap,
                    fieldPermissions: permissions,
                    i18n: i18n,
                    locales: locales,
                    version: version
                })
            })
        ]
    });
};
export default Nested;

//# sourceMappingURL=index.js.map