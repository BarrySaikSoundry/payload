'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ModalContainer, ModalProvider } from '@faceless-ui/modal';
import { ScrollInfoProvider } from '@faceless-ui/scroll-info';
import { WindowInfoProvider } from '@faceless-ui/window-info';
import React, { Fragment } from 'react';
import { LoadingOverlayProvider } from '../../elements/LoadingOverlay/index.js';
import { NavProvider } from '../../elements/Nav/context.js';
import { StayLoggedInModal } from '../../elements/StayLoggedIn/index.js';
import { StepNavProvider } from '../../elements/StepNav/index.js';
import { ActionsProvider } from '../Actions/index.js';
import { AuthProvider } from '../Auth/index.js';
import { ClientFunctionProvider } from '../ClientFunction/index.js';
import { ComponentMapProvider } from '../ComponentMap/index.js';
import { ConfigProvider } from '../Config/index.js';
import { DocumentEventsProvider } from '../DocumentEvents/index.js';
import { FieldComponentsProvider } from '../FieldComponents/index.js';
import { LocaleProvider } from '../Locale/index.js';
import { ParamsProvider } from '../Params/index.js';
import { PreferencesProvider } from '../Preferences/index.js';
import { RouteCache } from '../RouteCache/index.js';
import { SearchParamsProvider } from '../SearchParams/index.js';
import { ThemeProvider } from '../Theme/index.js';
import { ToastContainer } from '../ToastContainer/index.js';
import { TranslationProvider } from '../Translation/index.js';
export const RootProvider = ({ children, componentMap, config, dateFNSKey, fallbackLang, languageCode, languageOptions, switchLanguageServerAction, theme, translations })=>{
    return /*#__PURE__*/ _jsxs(Fragment, {
        children: [
            /*#__PURE__*/ _jsx(RouteCache, {
                children: /*#__PURE__*/ _jsx(ConfigProvider, {
                    config: config,
                    children: /*#__PURE__*/ _jsx(ComponentMapProvider, {
                        componentMap: componentMap,
                        children: /*#__PURE__*/ _jsx(FieldComponentsProvider, {
                            children: /*#__PURE__*/ _jsx(ClientFunctionProvider, {
                                children: /*#__PURE__*/ _jsx(TranslationProvider, {
                                    dateFNSKey: dateFNSKey,
                                    fallbackLang: fallbackLang,
                                    language: languageCode,
                                    languageOptions: languageOptions,
                                    switchLanguageServerAction: switchLanguageServerAction,
                                    translations: translations,
                                    children: /*#__PURE__*/ _jsx(WindowInfoProvider, {
                                        breakpoints: {
                                            l: '(max-width: 1440px)',
                                            m: '(max-width: 1024px)',
                                            s: '(max-width: 768px)',
                                            xs: '(max-width: 400px)'
                                        },
                                        children: /*#__PURE__*/ _jsx(ScrollInfoProvider, {
                                            children: /*#__PURE__*/ _jsx(SearchParamsProvider, {
                                                children: /*#__PURE__*/ _jsx(ModalProvider, {
                                                    classPrefix: "payload",
                                                    transTime: 0,
                                                    zIndex: "var(--z-modal)",
                                                    children: /*#__PURE__*/ _jsxs(AuthProvider, {
                                                        children: [
                                                            /*#__PURE__*/ _jsx(PreferencesProvider, {
                                                                children: /*#__PURE__*/ _jsx(ThemeProvider, {
                                                                    cookiePrefix: config.cookiePrefix,
                                                                    theme: theme,
                                                                    children: /*#__PURE__*/ _jsx(ParamsProvider, {
                                                                        children: /*#__PURE__*/ _jsx(LocaleProvider, {
                                                                            children: /*#__PURE__*/ _jsx(StepNavProvider, {
                                                                                children: /*#__PURE__*/ _jsx(LoadingOverlayProvider, {
                                                                                    children: /*#__PURE__*/ _jsx(DocumentEventsProvider, {
                                                                                        children: /*#__PURE__*/ _jsx(ActionsProvider, {
                                                                                            children: /*#__PURE__*/ _jsx(NavProvider, {
                                                                                                children: children
                                                                                            })
                                                                                        })
                                                                                    })
                                                                                })
                                                                            })
                                                                        })
                                                                    })
                                                                })
                                                            }),
                                                            /*#__PURE__*/ _jsx(ModalContainer, {}),
                                                            /*#__PURE__*/ _jsx(StayLoggedInModal, {})
                                                        ]
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            }),
            /*#__PURE__*/ _jsx(ToastContainer, {})
        ]
    });
};

//# sourceMappingURL=index.js.map