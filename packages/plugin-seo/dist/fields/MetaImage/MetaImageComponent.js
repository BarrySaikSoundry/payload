'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FieldLabel, UploadInput, useConfig, useDocumentInfo, useField, useFieldProps, useForm, useLocale, useTranslation } from '@payloadcms/ui';
import React, { useCallback } from 'react';
import { Pill } from '../../ui/Pill.js';
export const MetaImageComponent = (props)=>{
    const { CustomLabel, hasGenerateImageFn, label, labelProps, relationTo, required } = props || {};
    const { path: pathFromContext } = useFieldProps();
    const field = useField({
        ...props,
        path: pathFromContext
    });
    const { t } = useTranslation();
    const locale = useLocale();
    const { getData } = useForm();
    const docInfo = useDocumentInfo();
    const { errorMessage, setValue, showError, value } = field;
    const regenerateImage = useCallback(async ()=>{
        if (!hasGenerateImageFn) return;
        const genImageResponse = await fetch('/api/plugin-seo/generate-image', {
            body: JSON.stringify({
                ...docInfo,
                doc: {
                    ...getData()
                },
                locale: typeof locale === 'object' ? locale?.code : locale
            }),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        });
        const { result: generatedImage } = await genImageResponse.json();
        setValue(generatedImage || '');
    }, [
        hasGenerateImageFn,
        docInfo,
        getData,
        locale,
        setValue
    ]);
    const hasImage = Boolean(value);
    const config = useConfig();
    const { collections, routes: { api } = {}, serverURL } = config;
    const collection = collections?.find((coll)=>coll.slug === relationTo) || undefined;
    return /*#__PURE__*/ _jsxs("div", {
        style: {
            marginBottom: '20px'
        },
        children: [
            /*#__PURE__*/ _jsxs("div", {
                style: {
                    marginBottom: '5px',
                    position: 'relative'
                },
                children: [
                    /*#__PURE__*/ _jsxs("div", {
                        className: "plugin-seo__field",
                        children: [
                            /*#__PURE__*/ _jsx(FieldLabel, {
                                CustomLabel: CustomLabel,
                                label: label,
                                ...labelProps || {}
                            }),
                            hasGenerateImageFn && /*#__PURE__*/ _jsxs(React.Fragment, {
                                children: [
                                    "  —  ",
                                    /*#__PURE__*/ _jsx("button", {
                                        onClick: regenerateImage,
                                        style: {
                                            background: 'none',
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            color: 'currentcolor',
                                            cursor: 'pointer',
                                            padding: 0,
                                            textDecoration: 'underline'
                                        },
                                        type: "button",
                                        children: t('plugin-seo:autoGenerate')
                                    })
                                ]
                            })
                        ]
                    }),
                    hasGenerateImageFn && /*#__PURE__*/ _jsx("div", {
                        style: {
                            color: '#9A9A9A'
                        },
                        children: t('plugin-seo:imageAutoGenerationTip')
                    })
                ]
            }),
            /*#__PURE__*/ _jsx("div", {
                style: {
                    marginBottom: '10px',
                    position: 'relative'
                },
                children: /*#__PURE__*/ _jsx(UploadInput, {
                    CustomError: errorMessage,
                    api: api,
                    collection: collection,
                    filterOptions: field.filterOptions,
                    label: undefined,
                    onChange: (incomingImage)=>{
                        if (incomingImage !== null) {
                            const { id: incomingID } = incomingImage;
                            setValue(incomingID);
                        } else {
                            setValue(null);
                        }
                    },
                    relationTo: relationTo,
                    required: required,
                    serverURL: serverURL,
                    showError: showError,
                    style: {
                        marginBottom: 0
                    },
                    value: value
                })
            }),
            /*#__PURE__*/ _jsx("div", {
                style: {
                    alignItems: 'center',
                    display: 'flex',
                    width: '100%'
                },
                children: /*#__PURE__*/ _jsx(Pill, {
                    backgroundColor: hasImage ? 'green' : 'red',
                    color: "white",
                    label: hasImage ? t('plugin-seo:good') : t('plugin-seo:noImage')
                })
            })
        ]
    });
};

//# sourceMappingURL=MetaImageComponent.js.map