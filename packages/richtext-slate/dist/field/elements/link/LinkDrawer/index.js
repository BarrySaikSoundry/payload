'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Drawer, Form, FormSubmit, RenderFields, useConfig, useDocumentInfo, useEditDepth, useFieldProps, useHotkey, useTranslation } from '@payloadcms/ui';
import { getFormState } from '@payloadcms/ui/shared';
import React, { useCallback, useRef } from 'react';
import { linkFieldsSchemaPath } from '../shared.js';
import './index.scss';
const baseClass = 'rich-text-link-edit-modal';
export const LinkDrawer = ({ drawerSlug, fieldMap, handleModalSubmit, initialState })=>{
    const { t } = useTranslation();
    const { schemaPath } = useFieldProps();
    const fieldMapPath = `${schemaPath}.${linkFieldsSchemaPath}`;
    const { id } = useDocumentInfo();
    const config = useConfig();
    const onChange = useCallback(async ({ formState: prevFormState })=>{
        return await getFormState({
            apiRoute: config.routes.api,
            body: {
                id,
                formState: prevFormState,
                operation: 'update',
                schemaPath: fieldMapPath
            },
            serverURL: config.serverURL
        });
    }, [
        config.routes.api,
        config.serverURL,
        fieldMapPath,
        id
    ]);
    return /*#__PURE__*/ _jsx(Drawer, {
        className: baseClass,
        slug: drawerSlug,
        title: t('fields:editLink'),
        children: /*#__PURE__*/ _jsxs(Form, {
            beforeSubmit: [
                onChange
            ],
            disableValidationOnSubmit: true,
            initialState: initialState,
            onChange: [
                onChange
            ],
            onSubmit: handleModalSubmit,
            children: [
                /*#__PURE__*/ _jsx(RenderFields, {
                    fieldMap: fieldMap,
                    forceRender: true,
                    path: "",
                    readOnly: false,
                    schemaPath: ""
                }),
                /*#__PURE__*/ _jsx(LinkSubmit, {})
            ]
        })
    });
};
const LinkSubmit = ()=>{
    const { t } = useTranslation();
    const ref = useRef(null);
    const editDepth = useEditDepth();
    useHotkey({
        cmdCtrlKey: true,
        editDepth,
        keyCodes: [
            's'
        ]
    }, (e)=>{
        e.preventDefault();
        e.stopPropagation();
        if (ref?.current) {
            ref.current.click();
        }
    });
    return /*#__PURE__*/ _jsx(FormSubmit, {
        ref: ref,
        children: t('general:submit')
    });
};

//# sourceMappingURL=index.js.map