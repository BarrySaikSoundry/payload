'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LinkImport from 'next/link.js';
import React from 'react';
const baseClass = 'login__form';
const Link = LinkImport.default || LinkImport;
import { EmailField, Form, FormSubmit, PasswordField, TextField, useConfig, useTranslation } from '@payloadcms/ui';
import { email, password, text } from 'payload/shared';
export const LoginForm = ({ searchParams })=>{
    const config = useConfig();
    const { admin: { autoLogin, routes: { forgot: forgotRoute }, user: userSlug }, routes: { admin, api } } = config;
    const collectionConfig = config.collections?.find((collection)=>collection?.slug === userSlug);
    const loginWithUsername = collectionConfig?.auth?.loginWithUsername;
    const { t } = useTranslation();
    const prefillForm = autoLogin && autoLogin.prefillOnly;
    const initialState = {
        password: {
            initialValue: prefillForm ? autoLogin.password : undefined,
            valid: true,
            value: prefillForm ? autoLogin.password : undefined
        }
    };
    if (loginWithUsername) {
        initialState.username = {
            initialValue: prefillForm ? autoLogin.username : undefined,
            valid: true,
            value: prefillForm ? autoLogin.username : undefined
        };
    } else {
        initialState.email = {
            initialValue: prefillForm ? autoLogin.email : undefined,
            valid: true,
            value: prefillForm ? autoLogin.email : undefined
        };
    }
    return /*#__PURE__*/ _jsxs(Form, {
        action: `${api}/${userSlug}/login`,
        className: baseClass,
        disableSuccessStatus: true,
        initialState: initialState,
        method: "POST",
        redirect: typeof searchParams?.redirect === 'string' ? searchParams.redirect : admin,
        waitForAutocomplete: true,
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: `${baseClass}__inputWrap`,
                children: [
                    loginWithUsername ? /*#__PURE__*/ _jsx(TextField, {
                        label: t('authentication:username'),
                        name: "username",
                        required: true,
                        validate: (value)=>text(value, {
                                name: 'username',
                                type: 'text',
                                data: {},
                                preferences: {
                                    fields: {}
                                },
                                req: {
                                    payload: {
                                        config
                                    },
                                    t
                                },
                                required: true,
                                siblingData: {}
                            })
                    }) : /*#__PURE__*/ _jsx(EmailField, {
                        autoComplete: "email",
                        label: t('general:email'),
                        name: "email",
                        required: true,
                        validate: (value)=>email(value, {
                                name: 'email',
                                type: 'email',
                                data: {},
                                preferences: {
                                    fields: {}
                                },
                                req: {
                                    t
                                },
                                required: true,
                                siblingData: {}
                            })
                    }),
                    /*#__PURE__*/ _jsx(PasswordField, {
                        autoComplete: "off",
                        label: t('general:password'),
                        name: "password",
                        required: true,
                        validate: (value)=>password(value, {
                                name: 'password',
                                type: 'text',
                                data: {},
                                preferences: {
                                    fields: {}
                                },
                                req: {
                                    payload: {
                                        config
                                    },
                                    t
                                },
                                required: true,
                                siblingData: {}
                            })
                    })
                ]
            }),
            /*#__PURE__*/ _jsx(Link, {
                href: `${admin}${forgotRoute}`,
                children: t('authentication:forgotPasswordQuestion')
            }),
            /*#__PURE__*/ _jsx(FormSubmit, {
                children: t('authentication:login')
            })
        ]
    });
};

//# sourceMappingURL=index.js.map