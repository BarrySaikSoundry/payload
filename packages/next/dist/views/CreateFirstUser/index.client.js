'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ConfirmPasswordField, EmailField, Form, FormSubmit, PasswordField, RenderFields, useComponentMap, useConfig, useTranslation } from '@payloadcms/ui';
import { getFormState } from '@payloadcms/ui/shared';
import React from 'react';
export const CreateFirstUserClient = ({ initialState, userSlug })=>{
    const { getFieldMap } = useComponentMap();
    const { routes: { admin, api: apiRoute }, serverURL } = useConfig();
    const { t } = useTranslation();
    const fieldMap = getFieldMap({
        collectionSlug: userSlug
    });
    const onChange = React.useCallback(async ({ formState: prevFormState })=>{
        return getFormState({
            apiRoute,
            body: {
                collectionSlug: userSlug,
                formState: prevFormState,
                operation: 'create',
                schemaPath: userSlug
            },
            serverURL
        });
    }, [
        apiRoute,
        userSlug,
        serverURL
    ]);
    return /*#__PURE__*/ _jsxs(Form, {
        action: `${serverURL}${apiRoute}/${userSlug}/first-register`,
        initialState: initialState,
        method: "POST",
        onChange: [
            onChange
        ],
        redirect: admin,
        validationOperation: "create",
        children: [
            /*#__PURE__*/ _jsx(EmailField, {
                autoComplete: "email",
                label: t('general:email'),
                name: "email",
                required: true
            }),
            /*#__PURE__*/ _jsx(PasswordField, {
                autoComplete: "off",
                label: t('authentication:newPassword'),
                name: "password",
                required: true
            }),
            /*#__PURE__*/ _jsx(ConfirmPasswordField, {}),
            /*#__PURE__*/ _jsx(RenderFields, {
                fieldMap: fieldMap,
                operation: "create",
                path: "",
                readOnly: false,
                schemaPath: userSlug
            }),
            /*#__PURE__*/ _jsx(FormSubmit, {
                children: t('general:create')
            })
        ]
    });
};

//# sourceMappingURL=index.client.js.map