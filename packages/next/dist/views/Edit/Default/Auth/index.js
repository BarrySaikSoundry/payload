'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, CheckboxField, ConfirmPasswordField, EmailField, PasswordField, TextField, useConfig, useDocumentInfo, useFormFields, useFormModified, useTranslation } from '@payloadcms/ui';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { APIKey } from './APIKey.js';
const baseClass = 'auth-fields';
export const Auth = (props)=>{
    const { className, collectionSlug, disableLocalStrategy, email, loginWithUsername, operation, readOnly, requirePassword, useAPIKey, verify } = props;
    const [changingPassword, setChangingPassword] = useState(requirePassword);
    const enableAPIKey = useFormFields(([fields])=>fields && fields?.enableAPIKey || null);
    const dispatchFields = useFormFields((reducer)=>reducer[1]);
    const modified = useFormModified();
    const { i18n, t } = useTranslation();
    const { isInitializing } = useDocumentInfo();
    const { routes: { api }, serverURL } = useConfig();
    const handleChangePassword = useCallback((state)=>{
        if (!state) {
            dispatchFields({
                type: 'REMOVE',
                path: 'password'
            });
            dispatchFields({
                type: 'REMOVE',
                path: 'confirm-password'
            });
        }
        setChangingPassword(state);
    }, [
        dispatchFields
    ]);
    const unlock = useCallback(async ()=>{
        const url = `${serverURL}${api}/${collectionSlug}/unlock`;
        const response = await fetch(url, {
            body: JSON.stringify({
                email
            }),
            credentials: 'include',
            headers: {
                'Accept-Language': i18n.language,
                'Content-Type': 'application/json'
            },
            method: 'post'
        });
        if (response.status === 200) {
            toast.success(t('authentication:successfullyUnlocked'));
        } else {
            toast.error(t('authentication:failedToUnlock'));
        }
    }, [
        i18n,
        serverURL,
        api,
        collectionSlug,
        email,
        t
    ]);
    useEffect(()=>{
        if (!modified) {
            setChangingPassword(false);
        }
    }, [
        modified
    ]);
    if (disableLocalStrategy && !useAPIKey) {
        return null;
    }
    const disabled = readOnly || isInitializing;
    return /*#__PURE__*/ _jsxs("div", {
        className: [
            baseClass,
            className
        ].filter(Boolean).join(' '),
        children: [
            !disableLocalStrategy && /*#__PURE__*/ _jsxs(React.Fragment, {
                children: [
                    !loginWithUsername && /*#__PURE__*/ _jsx(EmailField, {
                        autoComplete: "email",
                        disabled: disabled,
                        label: t('general:email'),
                        name: "email",
                        readOnly: readOnly,
                        required: true
                    }),
                    loginWithUsername && /*#__PURE__*/ _jsx(TextField, {
                        disabled: disabled,
                        label: t('authentication:username'),
                        name: "username",
                        readOnly: readOnly,
                        required: true
                    }),
                    (changingPassword || requirePassword) && /*#__PURE__*/ _jsxs("div", {
                        className: `${baseClass}__changing-password`,
                        children: [
                            /*#__PURE__*/ _jsx(PasswordField, {
                                autoComplete: "off",
                                disabled: disabled,
                                label: t('authentication:newPassword'),
                                name: "password",
                                required: true
                            }),
                            /*#__PURE__*/ _jsx(ConfirmPasswordField, {
                                disabled: readOnly
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: `${baseClass}__controls`,
                        children: [
                            changingPassword && !requirePassword && /*#__PURE__*/ _jsx(Button, {
                                buttonStyle: "secondary",
                                disabled: disabled,
                                onClick: ()=>handleChangePassword(false),
                                size: "small",
                                children: t('general:cancel')
                            }),
                            !changingPassword && !requirePassword && /*#__PURE__*/ _jsx(Button, {
                                buttonStyle: "secondary",
                                disabled: disabled,
                                id: "change-password",
                                onClick: ()=>handleChangePassword(true),
                                size: "small",
                                children: t('authentication:changePassword')
                            }),
                            operation === 'update' && /*#__PURE__*/ _jsx(Button, {
                                buttonStyle: "secondary",
                                disabled: disabled,
                                onClick: ()=>unlock(),
                                size: "small",
                                children: t('authentication:forceUnlock')
                            })
                        ]
                    })
                ]
            }),
            useAPIKey && /*#__PURE__*/ _jsxs("div", {
                className: `${baseClass}__api-key`,
                children: [
                    /*#__PURE__*/ _jsx(CheckboxField, {
                        disabled: disabled,
                        label: t('authentication:enableAPIKey'),
                        name: "enableAPIKey",
                        readOnly: readOnly
                    }),
                    /*#__PURE__*/ _jsx(APIKey, {
                        enabled: !!enableAPIKey?.value,
                        readOnly: readOnly
                    })
                ]
            }),
            verify && /*#__PURE__*/ _jsx(CheckboxField, {
                disabled: disabled,
                label: t('authentication:verified'),
                name: "_verified",
                readOnly: readOnly
            })
        ]
    });
};

//# sourceMappingURL=index.js.map