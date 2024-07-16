'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { usePathname } from 'next/navigation.js';
import React from 'react';
import { useAuth } from '../../providers/Auth/index.js';
import { useConfig } from '../../providers/Config/index.js';
import { DefaultAccountIcon } from './Default/index.js';
import { GravatarAccountIcon } from './Gravatar/index.js';
export const Account = ()=>{
    const { admin: { avatar: Avatar }, admin: { routes: { account: accountRoute } }, routes: { admin: adminRoute } } = useConfig();
    const { user } = useAuth();
    const pathname = usePathname();
    const isOnAccountPage = pathname === `${adminRoute}${accountRoute}`;
    if (!user?.email || Avatar === 'default') return /*#__PURE__*/ _jsx(DefaultAccountIcon, {
        active: isOnAccountPage
    });
    if (Avatar === 'gravatar') return /*#__PURE__*/ _jsx(GravatarAccountIcon, {});
    if (Avatar) return /*#__PURE__*/ _jsx(Avatar, {
        active: isOnAccountPage
    });
};

//# sourceMappingURL=index.js.map