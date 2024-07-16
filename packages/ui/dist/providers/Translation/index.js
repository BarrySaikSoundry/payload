'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { importDateFNSLocale, t } from '@payloadcms/translations';
import { enUS } from 'date-fns/locale/en-US';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouteCache } from '../RouteCache/index.js';
const Context = /*#__PURE__*/ createContext({
    // Use `any` here to be replaced later with a more specific type when used
    i18n: {
        dateFNS: enUS,
        dateFNSKey: 'en-US',
        fallbackLanguage: 'en',
        language: 'en',
        t: (key)=>key,
        translations: {}
    },
    languageOptions: undefined,
    switchLanguage: undefined,
    t: (key)=>undefined
});
export const TranslationProvider = ({ children, dateFNSKey, fallbackLang, language, languageOptions, switchLanguageServerAction, translations })=>{
    const { clearRouteCache } = useRouteCache();
    const [dateFNS, setDateFNS] = useState();
    const nextT = (key, vars)=>t({
            key,
            translations,
            vars
        });
    const switchLanguage = React.useCallback(async (lang)=>{
        try {
            await switchLanguageServerAction(lang);
            clearRouteCache();
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error(`Error loading language: "${lang}"`, error);
        }
    }, [
        switchLanguageServerAction,
        clearRouteCache
    ]);
    useEffect(()=>{
        const loadDateFNS = async ()=>{
            const imported = await importDateFNSLocale(dateFNSKey);
            setDateFNS(imported);
        };
        void loadDateFNS();
    }, [
        dateFNSKey
    ]);
    return /*#__PURE__*/ _jsx(Context.Provider, {
        value: {
            i18n: {
                dateFNS,
                dateFNSKey,
                fallbackLanguage: fallbackLang,
                language,
                t: nextT,
                translations
            },
            languageOptions,
            switchLanguage,
            t: nextT
        },
        children: children
    });
};
export const useTranslation = ()=>useContext(Context);

//# sourceMappingURL=index.js.map