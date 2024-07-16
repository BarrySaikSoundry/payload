import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { Fragment } from 'react';
import { DocumentTabLink } from './TabLink.js';
export const baseClass = 'doc-tab';
export const DocumentTab = (props)=>{
    const { Pill, apiURL, collectionConfig, condition, config, globalConfig, href: tabHref, i18n, isActive: tabIsActive, label, newTab, permissions } = props;
    const { routes } = config;
    let href = typeof tabHref === 'string' ? tabHref : '';
    let isActive = typeof tabIsActive === 'boolean' ? tabIsActive : false;
    if (typeof tabHref === 'function') {
        href = tabHref({
            apiURL,
            collection: collectionConfig,
            global: globalConfig,
            routes
        });
    }
    if (typeof tabIsActive === 'function') {
        isActive = tabIsActive({
            href
        });
    }
    const meetsCondition = !condition || condition && Boolean(condition({
        collectionConfig,
        config,
        globalConfig,
        permissions
    }));
    if (meetsCondition) {
        const labelToRender = typeof label === 'function' ? label({
            t: i18n.t
        }) : label;
        return /*#__PURE__*/ _jsx(DocumentTabLink, {
            adminRoute: routes.admin,
            ariaLabel: labelToRender,
            baseClass: baseClass,
            href: href,
            isActive: isActive,
            isCollection: !!collectionConfig && !globalConfig,
            newTab: newTab,
            children: /*#__PURE__*/ _jsxs("span", {
                className: `${baseClass}__label`,
                children: [
                    labelToRender,
                    Pill && /*#__PURE__*/ _jsxs(Fragment, {
                        children: [
                            " ",
                            /*#__PURE__*/ _jsx(Pill, {})
                        ]
                    })
                ]
            })
        });
    }
    return null;
};

//# sourceMappingURL=index.js.map