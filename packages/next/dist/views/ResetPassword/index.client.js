'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ConfirmPasswordField, Form, FormSubmit, HiddenField, PasswordField, useAuth, useConfig, useFormFields, useTranslation } from '@payloadcms/ui';
import { useRouter } from 'next/navigation.js';
import React from 'react';
import { toast } from 'sonner';
const initialState = {
    'confirm-password': {
        initialValue: '',
        valid: false,
        value: ''
    },
    password: {
        initialValue: '',
        valid: false,
        value: ''
    }
};
export const ResetPasswordClient = ({ token })=>{
    const i18n = useTranslation();
    const { admin: { user: userSlug }, routes: { admin, api }, serverURL } = useConfig();
    const history = useRouter();
    const { fetchFullUser } = useAuth();
    const onSuccess = React.useCallback(async (data)=>{
        if (data.token) {
            await fetchFullUser();
            history.push(`${admin}`);
        } else {
            history.push(`${admin}/login`);
            toast.success(i18n.t('general:updatedSuccessfully'));
        }
    }, [
        fetchFullUser,
        history,
        admin,
        i18n
    ]);
    return /*#__PURE__*/ _jsxs(Form, {
        action: `${serverURL}${api}/${userSlug}/reset-password`,
        initialState: initialState,
        method: "POST",
        onSuccess: onSuccess,
        children: [
            /*#__PURE__*/ _jsx(PasswordToConfirm, {}),
            /*#__PURE__*/ _jsx(ConfirmPasswordField, {}),
            /*#__PURE__*/ _jsx(HiddenField, {
                forceUsePathFromProps: true,
                name: "token",
                value: token
            }),
            /*#__PURE__*/ _jsx(FormSubmit, {
                children: i18n.t('authentication:resetPassword')
            })
        ]
    });
};
const PasswordToConfirm = ()=>{
    const { t } = useTranslation();
    const { value: confirmValue } = useFormFields(([fields])=>fields && fields?.['confirm-password'] || null);
    const validate = React.useCallback((value)=>{
        if (!value) {
            return t('validation:required');
        }
        if (value === confirmValue) {
            return true;
        }
        return t('fields:passwordsDoNotMatch');
    }, [
        confirmValue,
        t
    ]);
    return /*#__PURE__*/ _jsx(PasswordField, {
        autoComplete: "off",
        label: t('authentication:newPassword'),
        name: "password",
        required: true,
        validate: validate
    });
};

//# sourceMappingURL=index.client.js.map