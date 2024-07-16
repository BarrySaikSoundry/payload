import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Logout } from '@payloadcms/ui';
import React from 'react';
import { NavHamburger } from './NavHamburger/index.js';
import { NavWrapper } from './NavWrapper/index.js';
const baseClass = 'nav';
import { WithServerSideProps } from '@payloadcms/ui/shared';
import { DefaultNavClient } from './index.client.js';
export const DefaultNav = (props)=>{
    const { i18n, locale, params, payload, permissions, searchParams, user } = props;
    if (!payload?.config) {
        return null;
    }
    const { admin: { components: { afterNavLinks, beforeNavLinks } } } = payload.config;
    const BeforeNavLinks = Array.isArray(beforeNavLinks) ? beforeNavLinks.map((Component, i)=>/*#__PURE__*/ _jsx(WithServerSideProps, {
            Component: Component,
            serverOnlyProps: {
                i18n,
                locale,
                params,
                payload,
                permissions,
                searchParams,
                user
            }
        }, i)) : null;
    const AfterNavLinks = Array.isArray(afterNavLinks) ? afterNavLinks.map((Component, i)=>/*#__PURE__*/ _jsx(WithServerSideProps, {
            Component: Component,
            serverOnlyProps: {
                i18n,
                locale,
                params,
                payload,
                permissions,
                searchParams,
                user
            }
        }, i)) : null;
    return /*#__PURE__*/ _jsxs(NavWrapper, {
        baseClass: baseClass,
        children: [
            /*#__PURE__*/ _jsxs("nav", {
                className: `${baseClass}__wrap`,
                children: [
                    Array.isArray(BeforeNavLinks) && BeforeNavLinks.map((Component)=>Component),
                    /*#__PURE__*/ _jsx(DefaultNavClient, {}),
                    Array.isArray(AfterNavLinks) && AfterNavLinks.map((Component)=>Component),
                    /*#__PURE__*/ _jsx("div", {
                        className: `${baseClass}__controls`,
                        children: /*#__PURE__*/ _jsx(Logout, {})
                    })
                ]
            }),
            /*#__PURE__*/ _jsx("div", {
                className: `${baseClass}__header`,
                children: /*#__PURE__*/ _jsx("div", {
                    className: `${baseClass}__header-content`,
                    children: /*#__PURE__*/ _jsx(NavHamburger, {
                        baseClass: baseClass
                    })
                })
            })
        ]
    });
};

//# sourceMappingURL=index.js.map