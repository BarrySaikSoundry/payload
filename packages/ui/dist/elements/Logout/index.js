'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React, { Fragment } from 'react';
import { LogOutIcon } from '../../icons/LogOut/index.js';
import { useComponentMap } from '../../providers/ComponentMap/index.js';
import { useConfig } from '../../providers/Config/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
const baseClass = 'nav';
const DefaultLogout = ({ Link, tabIndex })=>{
    const { t } = useTranslation();
    const config = useConfig();
    const { admin: { routes: { logout: logoutRoute } }, routes: { admin } } = config;
    const basePath = process.env.NEXT_BASE_PATH ?? '';
    const LinkElement = Link || 'a';
    return /*#__PURE__*/ _jsx(LinkElement, {
        "aria-label": t('authentication:logOut'),
        className: `${baseClass}__log-out`,
        href: `${basePath}${admin}${logoutRoute}`,
        tabIndex: tabIndex,
        children: /*#__PURE__*/ _jsx(LogOutIcon, {})
    });
};
export const Logout = ({ Link, tabIndex = 0 })=>{
    const { componentMap: { LogoutButton: CustomLogout } } = useComponentMap();
    if (CustomLogout) {
        return /*#__PURE__*/ _jsx(Fragment, {
            children: CustomLogout
        });
    }
    return /*#__PURE__*/ _jsx(DefaultLogout, {
        Link: Link,
        tabIndex: tabIndex
    });
};

//# sourceMappingURL=index.js.map