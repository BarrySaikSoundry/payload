'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CheckboxField, CopyToClipboard, Form, Gutter, MinimizeMaximizeIcon, NumberField as NumberInput, SetViewActions, useComponentMap, useConfig, useDocumentInfo, useLocale, useTranslation } from '@payloadcms/ui';
import { useSearchParams } from 'next/navigation.js';
import * as React from 'react';
import { toast } from 'sonner';
import { SetDocumentStepNav } from '../Edit/Default/SetDocumentStepNav/index.js';
import { LocaleSelector } from './LocaleSelector/index.js';
import { RenderJSON } from './RenderJSON/index.js';
const baseClass = 'query-inspector';
export const APIViewClient = ()=>{
    const { id, collectionSlug, globalSlug, initialData } = useDocumentInfo();
    const searchParams = useSearchParams();
    const { i18n, t } = useTranslation();
    const { code } = useLocale();
    const { getComponentMap } = useComponentMap();
    const componentMap = getComponentMap({
        collectionSlug,
        globalSlug
    });
    const { collections, globals, localization, routes: { api: apiRoute }, serverURL } = useConfig();
    const collectionConfig = collectionSlug && collections.find((collection)=>collection.slug === collectionSlug);
    const globalConfig = globalSlug && globals.find((global)=>global.slug === globalSlug);
    const localeOptions = localization && localization.locales.map((locale)=>({
            label: locale.label,
            value: locale.code
        }));
    let draftsEnabled = false;
    let docEndpoint = '';
    if (collectionConfig) {
        draftsEnabled = Boolean(collectionConfig.versions?.drafts);
        docEndpoint = `/${collectionSlug}/${id}`;
    }
    if (globalConfig) {
        draftsEnabled = Boolean(globalConfig.versions?.drafts);
        docEndpoint = `/globals/${globalSlug}`;
    }
    const [data, setData] = React.useState(initialData);
    const [draft, setDraft] = React.useState(searchParams.get('draft') === 'true');
    const [locale, setLocale] = React.useState(searchParams?.get('locale') || code);
    const [depth, setDepth] = React.useState(searchParams.get('depth') || '1');
    const [authenticated, setAuthenticated] = React.useState(true);
    const [fullscreen, setFullscreen] = React.useState(false);
    const params = new URLSearchParams({
        depth,
        draft: String(draft),
        locale
    }).toString();
    const fetchURL = `${serverURL}${apiRoute}${docEndpoint}?${params}`;
    React.useEffect(()=>{
        const fetchData = async ()=>{
            try {
                const res = await fetch(fetchURL, {
                    credentials: authenticated ? 'include' : 'omit',
                    headers: {
                        'Accept-Language': i18n.language
                    },
                    method: 'GET'
                });
                try {
                    const json = await res.json();
                    setData(json);
                } catch (error) {
                    toast.error('Error parsing response');
                    console.error(error);
                }
            } catch (error) {
                toast.error('Error making request');
                console.error(error);
            }
        };
        void fetchData();
    }, [
        i18n.language,
        fetchURL,
        authenticated
    ]);
    return /*#__PURE__*/ _jsxs(Gutter, {
        className: [
            baseClass,
            fullscreen && `${baseClass}--fullscreen`
        ].filter(Boolean).join(' '),
        right: false,
        children: [
            /*#__PURE__*/ _jsx(SetDocumentStepNav, {
                collectionSlug: collectionSlug,
                globalLabel: globalConfig?.label,
                globalSlug: globalSlug,
                id: id,
                pluralLabel: collectionConfig ? collectionConfig?.labels?.plural : undefined,
                useAsTitle: collectionConfig ? collectionConfig?.admin?.useAsTitle : undefined,
                view: "API"
            }),
            /*#__PURE__*/ _jsx(SetViewActions, {
                actions: componentMap?.actionsMap?.Edit?.API
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: `${baseClass}__configuration`,
                children: [
                    /*#__PURE__*/ _jsxs("div", {
                        className: `${baseClass}__api-url`,
                        children: [
                            /*#__PURE__*/ _jsxs("span", {
                                className: `${baseClass}__label`,
                                children: [
                                    "API URL ",
                                    /*#__PURE__*/ _jsx(CopyToClipboard, {
                                        value: fetchURL
                                    })
                                ]
                            }),
                            /*#__PURE__*/ _jsx("a", {
                                href: fetchURL,
                                rel: "noopener noreferrer",
                                target: "_blank",
                                children: fetchURL
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsx(Form, {
                        initialState: {
                            authenticated: {
                                initialValue: authenticated || false,
                                valid: true,
                                value: authenticated || false
                            },
                            depth: {
                                initialValue: Number(depth || 0),
                                valid: true,
                                value: Number(depth || 0)
                            },
                            draft: {
                                initialValue: draft || false,
                                valid: true,
                                value: draft || false
                            },
                            locale: {
                                initialValue: locale,
                                valid: true,
                                value: locale
                            }
                        },
                        children: /*#__PURE__*/ _jsxs("div", {
                            className: `${baseClass}__form-fields`,
                            children: [
                                /*#__PURE__*/ _jsxs("div", {
                                    className: `${baseClass}__filter-query-checkboxes`,
                                    children: [
                                        draftsEnabled && /*#__PURE__*/ _jsx(CheckboxField, {
                                            label: t('version:draft'),
                                            name: "draft",
                                            onChange: ()=>setDraft(!draft),
                                            path: "draft"
                                        }),
                                        /*#__PURE__*/ _jsx(CheckboxField, {
                                            label: t('authentication:authenticated'),
                                            name: "authenticated",
                                            onChange: ()=>setAuthenticated(!authenticated),
                                            path: "authenticated"
                                        })
                                    ]
                                }),
                                localeOptions && /*#__PURE__*/ _jsx(LocaleSelector, {
                                    localeOptions: localeOptions,
                                    onChange: setLocale
                                }),
                                /*#__PURE__*/ _jsx(NumberInput, {
                                    label: t('general:depth'),
                                    max: 10,
                                    min: 0,
                                    name: "depth",
                                    onChange: (value)=>setDepth(value?.toString()),
                                    path: "depth",
                                    step: 1
                                })
                            ]
                        })
                    })
                ]
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: `${baseClass}__results-wrapper`,
                children: [
                    /*#__PURE__*/ _jsx("div", {
                        className: `${baseClass}__toggle-fullscreen-button-container`,
                        children: /*#__PURE__*/ _jsx("button", {
                            "aria-label": "toggle fullscreen",
                            className: `${baseClass}__toggle-fullscreen-button`,
                            onClick: ()=>setFullscreen(!fullscreen),
                            type: "button",
                            children: /*#__PURE__*/ _jsx(MinimizeMaximizeIcon, {
                                isMinimized: !fullscreen
                            })
                        })
                    }),
                    /*#__PURE__*/ _jsx("div", {
                        className: `${baseClass}__results`,
                        children: /*#__PURE__*/ _jsx(RenderJSON, {
                            object: data
                        })
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=index.client.js.map