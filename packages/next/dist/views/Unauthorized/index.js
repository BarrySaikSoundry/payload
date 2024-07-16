import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Gutter } from '@payloadcms/ui';
import LinkImport from 'next/link.js';
import React from 'react';
const Link = LinkImport.default || LinkImport;
export { generateUnauthorizedMetadata } from './meta.js';
const baseClass = 'unauthorized';
export const UnauthorizedView = ({ initPageResult })=>{
    const { req: { i18n, payload: { config: { admin: { routes: { logout: logoutRoute } } } } } } = initPageResult;
    return /*#__PURE__*/ _jsxs(Gutter, {
        className: baseClass,
        children: [
            /*#__PURE__*/ _jsx("h2", {
                children: i18n.t('error:unauthorized')
            }),
            /*#__PURE__*/ _jsx("p", {
                children: i18n.t('error:notAllowedToAccessPage')
            }),
            /*#__PURE__*/ _jsx(Button, {
                Link: Link,
                className: `${baseClass}__button`,
                el: "link",
                to: logoutRoute,
                children: i18n.t('authentication:logOut')
            })
        ]
    });
};

//# sourceMappingURL=index.js.map