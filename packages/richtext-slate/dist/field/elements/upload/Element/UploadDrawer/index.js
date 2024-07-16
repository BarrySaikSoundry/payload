'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import { Drawer, Form, FormSubmit, RenderFields, useAuth, useConfig, useDocumentInfo, useLocale, useModal, useTranslation } from '@payloadcms/ui';
import { getFormState } from '@payloadcms/ui/shared';
import { deepCopyObject } from 'payload/shared';
import React, { useCallback, useEffect, useState } from 'react';
import { Transforms } from 'slate';
import { ReactEditor, useSlateStatic } from 'slate-react';
import { uploadFieldsSchemaPath } from '../../shared.js';
export const UploadDrawer = (props)=>{
    const editor = useSlateStatic();
    const { drawerSlug, element, fieldProps, relatedCollection, schemaPath } = props;
    const { i18n, t } = useTranslation();
    const { code: locale } = useLocale();
    const { user } = useAuth();
    const { closeModal } = useModal();
    const { id, collectionSlug } = useDocumentInfo();
    const [initialState, setInitialState] = useState({});
    const { richTextComponentMap } = fieldProps;
    const relatedFieldSchemaPath = `${uploadFieldsSchemaPath}.${relatedCollection.slug}`;
    const fieldMap = richTextComponentMap.get(relatedFieldSchemaPath);
    const config = useConfig();
    const handleUpdateEditData = useCallback((_, data)=>{
        const newNode = {
            fields: data
        };
        const elementPath = ReactEditor.findPath(editor, element);
        Transforms.setNodes(editor, newNode, {
            at: elementPath
        });
        closeModal(drawerSlug);
    }, [
        closeModal,
        editor,
        element,
        drawerSlug
    ]);
    useEffect(()=>{
        const data = deepCopyObject(element?.fields || {});
        const awaitInitialState = async ()=>{
            const state = await getFormState({
                apiRoute: config.routes.api,
                body: {
                    id,
                    collectionSlug,
                    data,
                    operation: 'update',
                    schemaPath: `${schemaPath}.${uploadFieldsSchemaPath}.${relatedCollection.slug}`
                },
                serverURL: config.serverURL
            });
            setInitialState(state);
        };
        void awaitInitialState();
    }, [
        config,
        element?.fields,
        user,
        locale,
        t,
        collectionSlug,
        id,
        schemaPath,
        relatedCollection.slug
    ]);
    const onChange = useCallback(async ({ formState: prevFormState })=>{
        return await getFormState({
            apiRoute: config.routes.api,
            body: {
                id,
                formState: prevFormState,
                operation: 'update',
                schemaPath: `${schemaPath}.${uploadFieldsSchemaPath}.${relatedCollection.slug}`
            },
            serverURL: config.serverURL
        });
    }, [
        config.routes.api,
        config.serverURL,
        relatedCollection.slug,
        schemaPath,
        id
    ]);
    return /*#__PURE__*/ _jsx(Drawer, {
        slug: drawerSlug,
        title: t('general:editLabel', {
            label: getTranslation(relatedCollection.labels.singular, i18n)
        }),
        children: /*#__PURE__*/ _jsxs(Form, {
            beforeSubmit: [
                onChange
            ],
            disableValidationOnSubmit: true,
            initialState: initialState,
            onChange: [
                onChange
            ],
            onSubmit: handleUpdateEditData,
            children: [
                /*#__PURE__*/ _jsx(RenderFields, {
                    fieldMap: Array.isArray(fieldMap) ? fieldMap : [],
                    path: "",
                    readOnly: false,
                    schemaPath: ""
                }),
                /*#__PURE__*/ _jsx(FormSubmit, {
                    children: t('fields:saveChanges')
                })
            ]
        })
    });
};

//# sourceMappingURL=index.js.map