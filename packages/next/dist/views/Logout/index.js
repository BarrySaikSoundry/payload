import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { LogoutClient } from './LogoutClient.js';
const baseClass = 'logout';
export { generateLogoutMetadata } from './meta.js';
export const LogoutView = ({ inactivity, initPageResult, searchParams })=>{
    const { req: { payload: { config: { routes: { admin } } } } } = initPageResult;
    return /*#__PURE__*/ _jsx("div", {
        className: `${baseClass}__wrap`,
        children: /*#__PURE__*/ _jsx(LogoutClient, {
            adminRoute: admin,
            inactivity: inactivity,
            redirect: searchParams.redirect
        })
    });
};
export const LogoutInactivity = (props)=>{
    return /*#__PURE__*/ _jsx(LogoutView, {
        inactivity: true,
        ...props
    });
};

//# sourceMappingURL=index.js.map