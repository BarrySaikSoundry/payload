'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FieldLabel, TextInput, useDocumentInfo, useField, useFieldProps, useForm, useLocale, useTranslation } from '@payloadcms/ui';
import React, { useCallback } from 'react';
import { defaults } from '../../defaults.js';
import { LengthIndicator } from '../../ui/LengthIndicator.js';
import '../index.scss';
const { maxLength, minLength } = defaults.title;
export const MetaTitleComponent = (props)=>{
    const { CustomLabel, hasGenerateTitleFn, label, labelProps, required } = props || {};
    const { path: pathFromContext } = useFieldProps();
    const { t } = useTranslation();
    const field = useField({
        path: pathFromContext
    });
    const locale = useLocale();
    const { getData } = useForm();
    const docInfo = useDocumentInfo();
    const { errorMessage, setValue, showError, value } = field;
    const regenerateTitle = useCallback(async ()=>{
        if (!hasGenerateTitleFn) return;
        const genTitleResponse = await fetch('/api/plugin-seo/generate-title', {
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
        const { result: generatedTitle } = await genTitleResponse.json();
        setValue(generatedTitle || '');
    }, [
        hasGenerateTitleFn,
        docInfo,
        getData,
        locale,
        setValue
    ]);
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
                            hasGenerateTitleFn && /*#__PURE__*/ _jsxs(React.Fragment, {
                                children: [
                                    "  —  ",
                                    /*#__PURE__*/ _jsx("button", {
                                        onClick: regenerateTitle,
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
                    /*#__PURE__*/ _jsxs("div", {
                        style: {
                            color: '#9A9A9A'
                        },
                        children: [
                            t('plugin-seo:lengthTipTitle', {
                                maxLength,
                                minLength
                            }),
                            /*#__PURE__*/ _jsx("a", {
                                href: "https://developers.google.com/search/docs/advanced/appearance/title-link#page-titles",
                                rel: "noopener noreferrer",
                                target: "_blank",
                                children: t('plugin-seo:bestPractices')
                            }),
                            "."
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ _jsx("div", {
                style: {
                    marginBottom: '10px',
                    position: 'relative'
                },
                children: /*#__PURE__*/ _jsx(TextInput, {
                    CustomError: errorMessage,
                    onChange: setValue,
                    path: pathFromContext,
                    required: required,
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
                children: /*#__PURE__*/ _jsx(LengthIndicator, {
                    maxLength: maxLength,
                    minLength: minLength,
                    text: value
                })
            })
        ]
    });
};

//# sourceMappingURL=MetaTitleComponent.js.map