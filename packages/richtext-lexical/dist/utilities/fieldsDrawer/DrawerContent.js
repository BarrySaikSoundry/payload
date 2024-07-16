'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Form, FormSubmit, RenderFields, useConfig, useDocumentInfo, useFieldProps, useTranslation } from '@payloadcms/ui';
import { getFormState } from '@payloadcms/ui/shared';
import React, { useCallback, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useEditorConfigContext } from '../../lexical/config/client/EditorConfigProvider.js';
export const DrawerContent = ({ data, featureKey, handleDrawerSubmit, schemaPathSuffix })=>{
    const { t } = useTranslation();
    const { id } = useDocumentInfo();
    const { schemaPath } = useFieldProps();
    const config = useConfig();
    const [initialState, setInitialState] = useState(false);
    const { field: { richTextComponentMap } } = useEditorConfigContext();
    const componentMapRenderedFieldsPath = `lexical_internal_feature.${featureKey}.fields${schemaPathSuffix ? `.${schemaPathSuffix}` : ''}`;
    const schemaFieldsPath = `${schemaPath}.lexical_internal_feature.${featureKey}${schemaPathSuffix ? `.${schemaPathSuffix}` : ''}`;
    const fieldMap = richTextComponentMap.get(componentMapRenderedFieldsPath) // Field Schema
    ;
    useEffect(()=>{
        const awaitInitialState = async ()=>{
            const state = await getFormState({
                apiRoute: config.routes.api,
                body: {
                    id,
                    data: data ?? {},
                    operation: 'update',
                    schemaPath: schemaFieldsPath
                },
                serverURL: config.serverURL
            }) // Form State
            ;
            setInitialState(state);
        };
        void awaitInitialState();
    }, [
        config.routes.api,
        config.serverURL,
        schemaFieldsPath,
        id,
        data
    ]);
    const onChange = useCallback(async ({ formState: prevFormState })=>{
        return await getFormState({
            apiRoute: config.routes.api,
            body: {
                id,
                formState: prevFormState,
                operation: 'update',
                schemaPath: schemaFieldsPath
            },
            serverURL: config.serverURL
        });
    }, [
        config.routes.api,
        config.serverURL,
        schemaFieldsPath,
        id
    ]);
    if (initialState === false) {
        return null;
    }
    return /*#__PURE__*/ _jsxs(Form, {
        beforeSubmit: [
            onChange
        ],
        disableValidationOnSubmit: true,
        fields: Array.isArray(fieldMap) ? fieldMap : [],
        initialState: initialState,
        onChange: [
            onChange
        ],
        onSubmit: handleDrawerSubmit,
        uuid: uuid(),
        children: [
            /*#__PURE__*/ _jsx(RenderFields, {
                fieldMap: Array.isArray(fieldMap) ? fieldMap : [],
                forceRender: true,
                path: "" // See Blocks feature path for details as for why this is empty
                ,
                readOnly: false,
                schemaPath: schemaFieldsPath
            }),
            /*#__PURE__*/ _jsx(FormSubmit, {
                children: t('fields:saveChanges')
            })
        ]
    });
};

//# sourceMappingURL=DrawerContent.js.map