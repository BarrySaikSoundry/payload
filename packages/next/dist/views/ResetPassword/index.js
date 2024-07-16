import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Translation } from '@payloadcms/ui';
import LinkImport from 'next/link.js';
import React from 'react';
import { MinimalTemplate } from '../../templates/Minimal/index.js';
import { ResetPasswordClient } from './index.client.js';
export const resetPasswordBaseClass = 'reset-password';
const Link = LinkImport.default || LinkImport;
export { generateResetPasswordMetadata } from './meta.js';
export const ResetPassword = ({ initPageResult, params })=>{
    const { req } = initPageResult;
    const { segments: [_, token] } = params;
    const { i18n, payload: { config }, user } = req;
    const { admin: { routes: { account: accountRoute } }, routes: { admin } } = config;
    if (user) {
        return /*#__PURE__*/ _jsx(MinimalTemplate, {
            className: resetPasswordBaseClass,
            children: /*#__PURE__*/ _jsxs("div", {
                className: `${resetPasswordBaseClass}__wrap`,
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
            })
        });
    }
    return /*#__PURE__*/ _jsx(MinimalTemplate, {
        className: resetPasswordBaseClass,
        children: /*#__PURE__*/ _jsxs("div", {
            className: `${resetPasswordBaseClass}__wrap`,
            children: [
                /*#__PURE__*/ _jsx("h1", {
                    children: i18n.t('authentication:resetPassword')
                }),
                /*#__PURE__*/ _jsx(ResetPasswordClient, {
                    token: token
                })
            ]
        })
    });
};

//# sourceMappingURL=index.js.map