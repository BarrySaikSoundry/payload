import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import { getUniqueListBy } from 'payload/shared';
import React from 'react';
import Label from '../../Label/index.js';
import RenderFieldsToDiff from '../../index.js';
const baseClass = 'iterable-diff';
const Iterable = ({ comparison, diffComponents, field, i18n, locale, locales, permissions, version })=>{
    const versionRowCount = Array.isArray(version) ? version.length : 0;
    const comparisonRowCount = Array.isArray(comparison) ? comparison.length : 0;
    const maxRows = Math.max(versionRowCount, comparisonRowCount);
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
            maxRows > 0 && /*#__PURE__*/ _jsx(React.Fragment, {
                children: Array.from(Array(maxRows).keys()).map((row, i)=>{
                    const versionRow = version?.[i] || {};
                    const comparisonRow = comparison?.[i] || {};
                    let fieldMap = [];
                    if (field.type === 'array' && 'fieldMap' in field.fieldComponentProps) fieldMap = field.fieldComponentProps.fieldMap;
                    if (field.type === 'blocks') {
                        fieldMap = [];
                        if (versionRow?.blockType === comparisonRow?.blockType) {
                            const matchedBlock = 'blocks' in field.fieldComponentProps && field.fieldComponentProps.blocks?.find((block)=>block.slug === versionRow?.blockType) || {
                                fieldMap: []
                            };
                            fieldMap = [
                                ...fieldMap,
                                ...matchedBlock.fieldMap
                            ];
                        } else {
                            const matchedVersionBlock = 'blocks' in field.fieldComponentProps && field.fieldComponentProps.blocks?.find((block)=>block.slug === versionRow?.blockType) || {
                                fieldMap: []
                            };
                            const matchedComparisonBlock = 'blocks' in field.fieldComponentProps && field.fieldComponentProps.blocks?.find((block)=>block.slug === comparisonRow?.blockType) || {
                                fieldMap: []
                            };
                            fieldMap = getUniqueListBy([
                                ...fieldMap,
                                ...matchedVersionBlock.fieldMap,
                                ...matchedComparisonBlock.fieldMap
                            ], 'name');
                        }
                    }
                    return /*#__PURE__*/ _jsx("div", {
                        className: `${baseClass}__wrap`,
                        children: /*#__PURE__*/ _jsx(RenderFieldsToDiff, {
                            comparison: comparisonRow,
                            diffComponents: diffComponents,
                            fieldMap: fieldMap,
                            fieldPermissions: permissions,
                            i18n: i18n,
                            locales: locales,
                            version: versionRow
                        })
                    }, i);
                })
            }),
            maxRows === 0 && /*#__PURE__*/ _jsx("div", {
                className: `${baseClass}__no-rows`,
                children: i18n.t('version:noRowsFound', {
                    label: 'labels' in field.fieldComponentProps && field.fieldComponentProps.labels?.plural ? getTranslation(field.fieldComponentProps.labels.plural, i18n) : i18n.t('general:rows')
                })
            })
        ]
    });
};
export default Iterable;

//# sourceMappingURL=index.js.map