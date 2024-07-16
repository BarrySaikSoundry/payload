'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Collapsible, Form, Pill, SectionTitle, ShimmerEffect, useConfig, useDocumentInfo, useFieldProps, useFormSubmitted, useTranslation } from '@payloadcms/ui';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
const baseClass = 'lexical-block';
import { getTranslation } from '@payloadcms/translations';
import { getFormState } from '@payloadcms/ui/shared';
import { v4 as uuid } from 'uuid';
import { useEditorConfigContext } from '../../../lexical/config/client/EditorConfigProvider.js';
import { BlockContent } from './BlockContent.js';
export const BlockComponent = (props)=>{
    const { formData, nodeKey } = props;
    const config = useConfig();
    const submitted = useFormSubmitted();
    const { id } = useDocumentInfo();
    const { path, schemaPath } = useFieldProps();
    const { editorConfig, field: parentLexicalRichTextField } = useEditorConfigContext();
    const [initialState, setInitialState] = useState(false);
    const { field: { richTextComponentMap } } = useEditorConfigContext();
    const componentMapRenderedFieldsPath = `lexical_internal_feature.blocks.fields.${formData?.blockType}`;
    const schemaFieldsPath = `${schemaPath}.lexical_internal_feature.blocks.${formData?.blockType}`;
    const reducedBlock = editorConfig?.resolvedFeatureMap?.get('blocks')?.sanitizedClientFeatureProps?.reducedBlocks?.find((block)=>block.slug === formData?.blockType);
    const fieldMap = richTextComponentMap.get(componentMapRenderedFieldsPath);
    // Field Schema
    useEffect(()=>{
        const awaitInitialState = async ()=>{
            const state = await getFormState({
                apiRoute: config.routes.api,
                body: {
                    id,
                    data: formData,
                    operation: 'update',
                    schemaPath: schemaFieldsPath
                },
                serverURL: config.serverURL
            }) // Form State
            ;
            if (state) {
                setInitialState({
                    ...state,
                    blockName: {
                        initialValue: '',
                        passesCondition: true,
                        valid: true,
                        value: formData.blockName
                    }
                });
            }
        };
        if (formData) {
            void awaitInitialState();
        }
    }, [
        config.routes.api,
        config.serverURL,
        schemaFieldsPath,
        id
    ]);
    const onChange = useCallback(async ({ formState: prevFormState })=>{
        const formState = await getFormState({
            apiRoute: config.routes.api,
            body: {
                id,
                formState: prevFormState,
                operation: 'update',
                schemaPath: schemaFieldsPath
            },
            serverURL: config.serverURL
        });
        return {
            ...formState,
            blockName: {
                initialValue: '',
                passesCondition: true,
                valid: true,
                value: formData.blockName
            }
        };
    }, [
        config.routes.api,
        config.serverURL,
        schemaFieldsPath,
        id,
        formData.blockName
    ]);
    const { i18n } = useTranslation();
    const classNames = [
        `${baseClass}__row`,
        `${baseClass}__row--no-errors`
    ].filter(Boolean).join(' ');
    // Memoized Form JSX
    const formContent = useMemo(()=>{
        return reducedBlock && initialState !== false ? /*#__PURE__*/ _jsx(Form, {
            beforeSubmit: [
                onChange
            ],
            // @ts-expect-error TODO: Fix this
            fields: fieldMap,
            initialState: initialState,
            onChange: [
                onChange
            ],
            submitted: submitted,
            uuid: uuid(),
            children: /*#__PURE__*/ _jsx(BlockContent, {
                baseClass: baseClass,
                field: parentLexicalRichTextField,
                formData: formData,
                formSchema: Array.isArray(fieldMap) ? fieldMap : [],
                nodeKey: nodeKey,
                path: `${path}.lexical_internal_feature.blocks.${formData.blockType}`,
                reducedBlock: reducedBlock,
                schemaPath: schemaFieldsPath
            })
        }) : /*#__PURE__*/ _jsx(Collapsible, {
            className: classNames,
            collapsibleStyle: "default",
            header: /*#__PURE__*/ _jsx("div", {
                className: `${baseClass}__block-header`,
                children: /*#__PURE__*/ _jsxs("div", {
                    children: [
                        /*#__PURE__*/ _jsx(Pill, {
                            className: `${baseClass}__block-pill ${baseClass}__block-pill-${formData?.blockType}`,
                            pillStyle: "white",
                            children: typeof reducedBlock.labels.singular === 'string' ? getTranslation(reducedBlock.labels.singular, i18n) : '[Singular Label]'
                        }),
                        /*#__PURE__*/ _jsx(SectionTitle, {
                            path: "blockName",
                            readOnly: parentLexicalRichTextField?.readOnly
                        })
                    ]
                })
            }),
            children: /*#__PURE__*/ _jsx(ShimmerEffect, {
                height: "35vh"
            })
        }, 0);
    }, [
        classNames,
        fieldMap,
        parentLexicalRichTextField,
        nodeKey,
        i18n,
        submitted,
        initialState,
        reducedBlock,
        onChange,
        schemaFieldsPath,
        path
    ]) // Adding formData to the dependencies here might break it
    ;
    return /*#__PURE__*/ _jsx("div", {
        className: baseClass + ' ' + baseClass + '-' + formData.blockType,
        children: formContent
    });
};

//# sourceMappingURL=index.js.map