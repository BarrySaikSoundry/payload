'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FieldLabel, TextareaInput, useDocumentInfo, useField, useFieldProps, useForm, useLocale, useTranslation } from '@payloadcms/ui';
import React, { useCallback } from 'react';
import { defaults } from '../../defaults.js';
import { LengthIndicator } from '../../ui/LengthIndicator.js';
const { maxLength, minLength } = defaults.description;
export const MetaDescriptionComponent = (props)=>{
    const { CustomLabel, hasGenerateDescriptionFn, label, labelProps, required } = props;
    const { path: pathFromContext } = useFieldProps();
    const { t } = useTranslation();
    const locale = useLocale();
    const { getData } = useForm();
    const docInfo = useDocumentInfo();
    const field = useField({
        path: pathFromContext
    });
    const { errorMessage, setValue, showError, value } = field;
    const regenerateDescription = useCallback(async ()=>{
        if (!hasGenerateDescriptionFn) return;
        const genDescriptionResponse = await fetch('/api/plugin-seo/generate-description', {
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
        const { result: generatedDescription } = await genDescriptionResponse.json();
        setValue(generatedDescription || '');
    }, [
        hasGenerateDescriptionFn,
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
                            hasGenerateDescriptionFn && /*#__PURE__*/ _jsxs(React.Fragment, {
                                children: [
                                    "  —  ",
                                    /*#__PURE__*/ _jsx("button", {
                                        onClick: regenerateDescription,
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
                            t('plugin-seo:lengthTipDescription', {
                                maxLength,
                                minLength
                            }),
                            /*#__PURE__*/ _jsx("a", {
                                href: "https://developers.google.com/search/docs/advanced/appearance/snippet#meta-descriptions",
                                rel: "noopener noreferrer",
                                target: "_blank",
                                children: t('plugin-seo:bestPractices')
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ _jsx("div", {
                style: {
                    marginBottom: '10px',
                    position: 'relative'
                },
                children: /*#__PURE__*/ _jsx(TextareaInput, {
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

//# sourceMappingURL=MetaDescriptionComponent.js.map