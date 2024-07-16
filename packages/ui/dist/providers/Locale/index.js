'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { findLocaleFromCode } from '../../utilities/findLocaleFromCode.js';
import { useAuth } from '../Auth/index.js';
import { useConfig } from '../Config/index.js';
import { usePreferences } from '../Preferences/index.js';
import { useSearchParams } from '../SearchParams/index.js';
const LocaleContext = /*#__PURE__*/ createContext({});
export const LocaleProvider = ({ children })=>{
    const { localization } = useConfig();
    const { user } = useAuth();
    const defaultLocale = localization && localization.defaultLocale ? localization.defaultLocale : 'en';
    const { searchParams } = useSearchParams();
    const localeFromParams = searchParams?.locale;
    const [localeCode, setLocaleCode] = useState(localeFromParams || defaultLocale);
    const [locale, setLocale] = useState(localization && findLocaleFromCode(localization, localeCode));
    const { getPreference, setPreference } = usePreferences();
    const switchLocale = React.useCallback(async (newLocale)=>{
        if (!localization) {
            return;
        }
        const localeToSet = localization.localeCodes.indexOf(newLocale) > -1 ? newLocale : defaultLocale;
        if (localeToSet !== localeCode) {
            setLocaleCode(localeToSet);
            setLocale(findLocaleFromCode(localization, localeToSet));
            try {
                if (user) await setPreference('locale', localeToSet);
            } catch (error) {
            // swallow error
            }
        }
    }, [
        localization,
        setPreference,
        user,
        defaultLocale,
        localeCode
    ]);
    useEffect(()=>{
        async function setInitialLocale() {
            let localeToSet = defaultLocale;
            if (typeof localeFromParams === 'string') {
                localeToSet = localeFromParams;
            } else if (user) {
                try {
                    localeToSet = await getPreference('locale');
                } catch (error) {
                // swallow error
                }
            }
            await switchLocale(localeToSet);
        }
        void setInitialLocale();
    }, [
        defaultLocale,
        getPreference,
        localization,
        localeFromParams,
        setPreference,
        user,
        switchLocale
    ]);
    return /*#__PURE__*/ _jsx(LocaleContext.Provider, {
        value: locale,
        children: children
    });
};
/**
 * A hook that returns the current locale object.
 */ export const useLocale = ()=>useContext(LocaleContext);

//# sourceMappingURL=index.js.map