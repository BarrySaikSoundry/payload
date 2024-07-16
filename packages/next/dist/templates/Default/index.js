import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppHeader, EntityVisibilityProvider, NavToggler } from '@payloadcms/ui';
import { RenderCustomComponent } from '@payloadcms/ui/shared';
import React from 'react';
import { DefaultNav } from '../../elements/Nav/index.js';
import { NavHamburger } from './NavHamburger/index.js';
import { Wrapper } from './Wrapper/index.js';
const baseClass = 'template-default';
export const DefaultTemplate = ({ children, className, i18n, locale, params, payload, permissions, searchParams, user, visibleEntities })=>{
    const { admin: { components: { Nav: CustomNav } = {
        Nav: undefined
    } } = {} } = payload.config || {};
    const navProps = {
        i18n,
        locale,
        params,
        payload,
        permissions,
        searchParams,
        user
    };
    return /*#__PURE__*/ _jsx(EntityVisibilityProvider, {
        visibleEntities: visibleEntities,
        children: /*#__PURE__*/ _jsxs("div", {
            children: [
                /*#__PURE__*/ _jsx("div", {
                    className: `${baseClass}__nav-toggler-wrapper`,
                    id: "nav-toggler",
                    children: /*#__PURE__*/ _jsx(NavToggler, {
                        className: `${baseClass}__nav-toggler`,
                        children: /*#__PURE__*/ _jsx(NavHamburger, {})
                    })
                }),
                /*#__PURE__*/ _jsxs(Wrapper, {
                    baseClass: baseClass,
                    className: className,
                    children: [
                        /*#__PURE__*/ _jsx(RenderCustomComponent, {
                            CustomComponent: CustomNav,
                            DefaultComponent: DefaultNav,
                            componentProps: navProps,
                            serverOnlyProps: {
                                i18n,
                                locale,
                                params,
                                payload,
                                permissions,
                                searchParams,
                                user
                            }
                        }),
                        /*#__PURE__*/ _jsxs("div", {
                            className: `${baseClass}__wrap`,
                            children: [
                                /*#__PURE__*/ _jsx(AppHeader, {}),
                                children
                            ]
                        })
                    ]
                })
            ]
        })
    });
};

//# sourceMappingURL=index.js.map