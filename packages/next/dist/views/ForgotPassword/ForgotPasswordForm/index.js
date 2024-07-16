'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { EmailField, Form, FormSubmit, TextField, useConfig, useTranslation } from '@payloadcms/ui';
import { email, text } from 'payload/shared';
import React, { Fragment, useState } from 'react';
export const ForgotPasswordForm = ()=>{
    const config = useConfig();
    const { admin: { user: userSlug }, routes: { api } } = config;
    const { t } = useTranslation();
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const collectionConfig = config.collections?.find((collection)=>collection?.slug === userSlug);
    const loginWithUsername = collectionConfig?.auth?.loginWithUsername;
    const handleResponse = (res, successToast, errorToast)=>{
        res.json().then(()=>{
            setHasSubmitted(true);
            successToast(t('general:submissionSuccessful'));
        }).catch(()=>{
            errorToast(loginWithUsername ? t('authentication:usernameNotValid') : t('authentication:emailNotValid'));
        });
    };
    const initialState = loginWithUsername ? {
        username: {
            initialValue: '',
            valid: true,
            value: undefined
        }
    } : {
        email: {
            initialValue: '',
            valid: true,
            value: undefined
        }
    };
    if (hasSubmitted) {
        return /*#__PURE__*/ _jsxs(Fragment, {
            children: [
                /*#__PURE__*/ _jsx("h1", {
                    children: t('authentication:emailSent')
                }),
                /*#__PURE__*/ _jsx("p", {
                    children: t('authentication:checkYourEmailForPasswordReset')
                })
            ]
        });
    }
    return /*#__PURE__*/ _jsxs(Form, {
        action: `${api}/${userSlug}/forgot-password`,
        handleResponse: handleResponse,
        initialState: initialState,
        method: "POST",
        children: [
            /*#__PURE__*/ _jsx("h1", {
                children: t('authentication:forgotPassword')
            }),
            /*#__PURE__*/ _jsx("p", {
                children: loginWithUsername ? t('authentication:forgotPasswordUsernameInstructions') : t('authentication:forgotPasswordEmailInstructions')
            }),
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
            /*#__PURE__*/ _jsx(FormSubmit, {
                children: t('general:submit')
            })
        ]
    });
};

//# sourceMappingURL=index.js.map