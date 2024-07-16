import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import RenderFieldsToDiff from '../../index.js';
import Nested from '../Nested/index.js';
const baseClass = 'tabs-diff';
const Tabs = ({ comparison, diffComponents, field, i18n, locale, locales, permissions, version })=>{
    return /*#__PURE__*/ _jsx("div", {
        className: baseClass,
        children: /*#__PURE__*/ _jsx("div", {
            className: `${baseClass}__wrap`,
            children: field.tabs.map((tab, i)=>{
                if ('name' in tab) {
                    return /*#__PURE__*/ _jsx(Nested, {
                        comparison: comparison?.[tab.name],
                        diffComponents: diffComponents,
                        field: field,
                        fieldMap: tab.fieldMap,
                        i18n: i18n,
                        locale: locale,
                        locales: locales,
                        permissions: permissions,
                        version: version?.[tab.name]
                    }, i);
                }
                return /*#__PURE__*/ _jsx(RenderFieldsToDiff, {
                    comparison: comparison,
                    diffComponents: diffComponents,
                    fieldMap: tab.fieldMap,
                    fieldPermissions: permissions,
                    i18n: i18n,
                    locales: locales,
                    version: version
                }, i);
            })
        })
    });
};
export default Tabs;

//# sourceMappingURL=index.js.map