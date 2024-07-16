'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import Nested from './fields/Nested/index.js';
import { diffMethods } from './fields/diffMethods.js';
const baseClass = 'render-field-diffs';
const RenderFieldsToDiff = ({ comparison, diffComponents, fieldMap, fieldPermissions, i18n, locales, version })=>{
    return /*#__PURE__*/ _jsx("div", {
        className: baseClass,
        children: fieldMap?.map((field, i)=>{
            if ('name' in field && field.name === 'id') return null;
            const Component = diffComponents[field.type];
            const isRichText = field.type === 'richText';
            const diffMethod = diffMethods[field.type] || 'CHARS';
            if (Component) {
                if (field.isFieldAffectingData && 'name' in field) {
                    const fieldName = field.name;
                    const valueIsObject = field.type === 'code' || field.type === 'json';
                    const versionValue = valueIsObject ? JSON.stringify(version?.[fieldName]) : version?.[fieldName];
                    const comparisonValue = valueIsObject ? JSON.stringify(comparison?.[fieldName]) : comparison?.[fieldName];
                    const hasPermission = fieldPermissions?.[fieldName]?.read?.permission;
                    const subFieldPermissions = fieldPermissions?.[fieldName]?.fields;
                    if (hasPermission === false) return null;
                    const baseCellProps = {
                        comparison: comparisonValue,
                        diffComponents,
                        diffMethod,
                        field,
                        fieldMap: 'fieldMap' in field.fieldComponentProps ? field.fieldComponentProps?.fieldMap : fieldMap,
                        fieldPermissions: subFieldPermissions,
                        i18n,
                        isRichText,
                        locales,
                        version: versionValue
                    };
                    if (field.localized) {
                        return /*#__PURE__*/ _jsx("div", {
                            className: `${baseClass}__field`,
                            children: locales.map((locale, index)=>{
                                const versionLocaleValue = versionValue?.[locale];
                                const comparisonLocaleValue = comparisonValue?.[locale];
                                const cellProps = {
                                    ...baseCellProps,
                                    comparison: comparisonLocaleValue,
                                    version: versionLocaleValue
                                };
                                return /*#__PURE__*/ _jsx("div", {
                                    className: `${baseClass}__locale`,
                                    children: /*#__PURE__*/ _jsx("div", {
                                        className: `${baseClass}__locale-value`,
                                        children: /*#__PURE__*/ _jsx(Component, {
                                            ...cellProps,
                                            locale: locale
                                        })
                                    })
                                }, [
                                    locale,
                                    index
                                ].join('-'));
                            })
                        }, i);
                    }
                    return /*#__PURE__*/ _jsx("div", {
                        className: `${baseClass}__field`,
                        children: /*#__PURE__*/ _jsx(Component, {
                            ...baseCellProps
                        })
                    }, i);
                }
                if (field.type === 'tabs' && 'fieldMap' in field.fieldComponentProps) {
                    const Tabs = diffComponents.tabs;
                    return /*#__PURE__*/ _jsx(Tabs, {
                        comparison: comparison,
                        diffComponents: diffComponents,
                        field: field,
                        fieldMap: field.fieldComponentProps.fieldMap,
                        i18n: i18n,
                        locales: locales,
                        version: version
                    }, i);
                }
                // At this point, we are dealing with a `row`, etc
                if ('fieldMap' in field.fieldComponentProps) {
                    return /*#__PURE__*/ _jsx(Nested, {
                        comparison: comparison,
                        diffComponents: diffComponents,
                        disableGutter: true,
                        field: field,
                        fieldMap: field.fieldComponentProps.fieldMap,
                        i18n: i18n,
                        locales: locales,
                        permissions: fieldPermissions,
                        version: version
                    }, i);
                }
            }
            return null;
        })
    });
};
export default RenderFieldsToDiff;

//# sourceMappingURL=index.js.map