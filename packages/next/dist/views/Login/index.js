import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { WithServerSideProps } from '@payloadcms/ui/shared';
import { redirect } from 'next/navigation.js';
import React, { Fragment } from 'react';
import { Logo } from '../../elements/Logo/index.js';
import { LoginForm } from './LoginForm/index.js';
export { generateLoginMetadata } from './meta.js';
export const loginBaseClass = 'login';
export const LoginView = ({ initPageResult, params, searchParams })=>{
    const { locale, permissions, req } = initPageResult;
    const { i18n, payload: { config }, payload, user } = req;
    const { admin: { components: { afterLogin, beforeLogin } = {}, user: userSlug }, collections, routes: { admin } } = config;
    const BeforeLogins = Array.isArray(beforeLogin) ? beforeLogin.map((Component, i)=>/*#__PURE__*/ _jsx(WithServerSideProps, {
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
    const AfterLogins = Array.isArray(afterLogin) ? afterLogin.map((Component, i)=>/*#__PURE__*/ _jsx(WithServerSideProps, {
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
    if (user) {
        redirect(admin);
    }
    const collectionConfig = collections.find(({ slug })=>slug === userSlug);
    return /*#__PURE__*/ _jsxs(Fragment, {
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: `${loginBaseClass}__brand`,
                children: /*#__PURE__*/ _jsx(Logo, {
                    i18n: i18n,
                    locale: locale,
                    params: params,
                    payload: payload,
                    permissions: permissions,
                    searchParams: searchParams,
                    user: user
                })
            }),
            Array.isArray(BeforeLogins) && BeforeLogins.map((Component)=>Component),
            !collectionConfig?.auth?.disableLocalStrategy && /*#__PURE__*/ _jsx(LoginForm, {
                searchParams: searchParams
            }),
            Array.isArray(AfterLogins) && AfterLogins.map((Component)=>Component)
        ]
    });
};

//# sourceMappingURL=index.js.map