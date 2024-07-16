'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import { useRouter } from 'next/navigation.js';
import React from 'react';
import { useConfig } from '../../providers/Config/index.js';
import { useLocale } from '../../providers/Locale/index.js';
import { useRouteCache } from '../../providers/RouteCache/index.js';
import { useSearchParams } from '../../providers/SearchParams/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { Popup, PopupList } from '../Popup/index.js';
import { LocalizerLabel } from './LocalizerLabel/index.js';
import './index.scss';
const baseClass = 'localizer';
export const Localizer = (props)=>{
    const { className } = props;
    const config = useConfig();
    const { localization } = config;
    const { i18n } = useTranslation();
    const locale = useLocale();
    const { stringifyParams } = useSearchParams();
    const router = useRouter();
    const { clearRouteCache } = useRouteCache();
    if (localization) {
        const { locales } = localization;
        return /*#__PURE__*/ _jsx("div", {
            className: [
                baseClass,
                className
            ].filter(Boolean).join(' '),
            children: /*#__PURE__*/ _jsx(Popup, {
                button: /*#__PURE__*/ _jsx(LocalizerLabel, {}),
                horizontalAlign: "right",
                render: ({ close })=>/*#__PURE__*/ _jsx(PopupList.ButtonGroup, {
                        children: locales.map((localeOption)=>{
                            const localeOptionLabel = getTranslation(localeOption.label, i18n);
                            return /*#__PURE__*/ _jsxs(PopupList.Button, {
                                active: locale.code === localeOption.code,
                                onClick: ()=>{
                                    router.replace(stringifyParams({
                                        params: {
                                            locale: localeOption.code
                                        }
                                    }));
                                    clearRouteCache();
                                    close();
                                },
                                children: [
                                    localeOptionLabel,
                                    localeOptionLabel !== localeOption.code && ` (${localeOption.code})`
                                ]
                            }, localeOption.code);
                        })
                    }),
                showScrollbar: true,
                size: "large"
            })
        });
    }
    return null;
};

//# sourceMappingURL=index.js.map