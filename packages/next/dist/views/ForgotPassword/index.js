import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Translation } from '@payloadcms/ui';
import LinkImport from 'next/link.js';
import React, { Fragment } from 'react';
import { ForgotPasswordForm } from './ForgotPasswordForm/index.js';
export { generateForgotPasswordMetadata } from './meta.js';
const Link = LinkImport.default || LinkImport;
export const forgotPasswordBaseClass = 'forgot-password';
export const ForgotPasswordView = ({ initPageResult })=>{
    const { req: { i18n, payload: { config }, user } } = initPageResult;
    const { admin: { routes: { account: accountRoute } }, routes: { admin } } = config;
    if (user) {
        return /*#__PURE__*/ _jsxs(Fragment, {
            children: [
                /*#__PURE__*/ _jsx("h1", {
                    children: i18n.t('authentication:alreadyLoggedIn')
                }),
                /*#__PURE__*/ _jsx("p", {
                    children: /*#__PURE__*/ _jsx(Translation, {
                        elements: {
                            '0': ({ children })=>/*#__PURE__*/ _jsx(Link, {
                                    href: `${admin}${accountRoute}`,
                                    children: children
                                })
                        },
                        i18nKey: "authentication:loggedInChangePassword",
                        t: i18n.t
                    })
                }),
                /*#__PURE__*/ _jsx("br", {}),
                /*#__PURE__*/ _jsx(Button, {
                    Link: Link,
                    buttonStyle: "secondary",
                    el: "link",
                    to: admin,
                    children: i18n.t('general:backToDashboard')
                })
            ]
        });
    }
    return /*#__PURE__*/ _jsxs(Fragment, {
        children: [
            /*#__PURE__*/ _jsx(ForgotPasswordForm, {}),
            /*#__PURE__*/ _jsx(Link, {
                href: `${admin}/login`,
                children: i18n.t('authentication:backToLogin')
            })
        ]
    });
};

//# sourceMappingURL=index.js.map