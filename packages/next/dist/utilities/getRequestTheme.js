import { defaultTheme } from '@payloadcms/ui';
const acceptedThemes = [
    'dark',
    'light'
];
export const getRequestTheme = ({ config, cookies, headers })=>{
    const themeCookie = cookies.get(`${config.cookiePrefix || 'payload'}-theme`);
    const themeFromCookie = typeof themeCookie === 'string' ? themeCookie : themeCookie?.value;
    if (themeFromCookie && acceptedThemes.includes(themeFromCookie)) {
        return themeFromCookie;
    }
    const themeFromHeader = headers.get('Sec-CH-Prefers-Color-Scheme');
    if (themeFromHeader && acceptedThemes.includes(themeFromHeader)) {
        return themeFromHeader;
    }
    return defaultTheme;
};

//# sourceMappingURL=getRequestTheme.js.map