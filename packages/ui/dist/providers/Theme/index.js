'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
const initialContext = {
    autoMode: true,
    setTheme: ()=>null,
    theme: 'light'
};
const Context = /*#__PURE__*/ createContext(initialContext);
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}
const getTheme = (cookieKey)=>{
    let theme;
    const themeFromCookies = window.document.cookie.split('; ').find((row)=>row.startsWith(`${cookieKey}=`))?.split('=')[1];
    if (themeFromCookies === 'light' || themeFromCookies === 'dark') {
        theme = themeFromCookies;
    } else {
        theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', theme);
    return {
        theme,
        themeFromCookies
    };
};
export const defaultTheme = 'light';
export const ThemeProvider = ({ children, cookiePrefix, theme: initialTheme })=>{
    const cookieKey = `${cookiePrefix || 'payload'}-theme`;
    const [theme, setThemeState] = useState(initialTheme || defaultTheme);
    const [autoMode, setAutoMode] = useState();
    useEffect(()=>{
        const { theme, themeFromCookies } = getTheme(cookieKey);
        setThemeState(theme);
        setAutoMode(!themeFromCookies);
    }, [
        cookieKey
    ]);
    const setTheme = useCallback((themeToSet)=>{
        if (themeToSet === 'light' || themeToSet === 'dark') {
            setThemeState(themeToSet);
            setAutoMode(false);
            setCookie(cookieKey, themeToSet, 365);
            document.documentElement.setAttribute('data-theme', themeToSet);
        } else if (themeToSet === 'auto') {
            // to delete the cookie, we set an expired date
            setCookie(cookieKey, themeToSet, -1);
            const themeFromOS = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', themeFromOS);
            setAutoMode(true);
            setThemeState(themeFromOS);
        }
    }, [
        cookieKey
    ]);
    return /*#__PURE__*/ _jsx(Context.Provider, {
        value: {
            autoMode,
            setTheme,
            theme
        },
        children: children
    });
};
export const useTheme = ()=>useContext(Context);

//# sourceMappingURL=index.js.map