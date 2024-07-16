'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAllFormFields, useDocumentInfo, useForm, useLocale, useTranslation } from '@payloadcms/ui';
import React, { useEffect, useState } from 'react';
export const PreviewComponent = ({ descriptionPath: descriptionPathFromContext, hasGenerateURLFn, titlePath: titlePathFromContext })=>{
    const { t } = useTranslation();
    const locale = useLocale();
    const [fields] = useAllFormFields();
    const { getData } = useForm();
    const docInfo = useDocumentInfo();
    const descriptionPath = descriptionPathFromContext || 'meta.description';
    const titlePath = titlePathFromContext || 'meta.title';
    const { [descriptionPath]: { value: metaDescription } = {}, [titlePath]: { value: metaTitle } = {} } = fields;
    const [href, setHref] = useState();
    useEffect(()=>{
        const getHref = async ()=>{
            const genURLResponse = await fetch('/api/plugin-seo/generate-url', {
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
            const { result: newHref } = await genURLResponse.json();
            setHref(newHref);
        };
        if (hasGenerateURLFn && !href) {
            void getHref();
        }
    }, [
        fields,
        href,
        locale,
        docInfo,
        hasGenerateURLFn,
        getData
    ]);
    return /*#__PURE__*/ _jsxs("div", {
        children: [
            /*#__PURE__*/ _jsx("div", {
                children: t('plugin-seo:preview')
            }),
            /*#__PURE__*/ _jsx("div", {
                style: {
                    color: '#9A9A9A',
                    marginBottom: '5px'
                },
                children: t('plugin-seo:previewDescription')
            }),
            /*#__PURE__*/ _jsxs("div", {
                style: {
                    background: 'var(--theme-elevation-50)',
                    borderRadius: '5px',
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    maxWidth: '600px',
                    padding: '20px',
                    pointerEvents: 'none',
                    width: '100%'
                },
                children: [
                    /*#__PURE__*/ _jsx("div", {
                        children: /*#__PURE__*/ _jsx("a", {
                            href: href,
                            style: {
                                textDecoration: 'none'
                            },
                            children: href || 'https://...'
                        })
                    }),
                    /*#__PURE__*/ _jsx("h4", {
                        style: {
                            margin: 0
                        },
                        children: /*#__PURE__*/ _jsx("a", {
                            href: "/",
                            style: {
                                textDecoration: 'none'
                            },
                            children: metaTitle
                        })
                    }),
                    /*#__PURE__*/ _jsx("p", {
                        style: {
                            margin: 0
                        },
                        children: metaDescription
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=PreviewComponent.js.map