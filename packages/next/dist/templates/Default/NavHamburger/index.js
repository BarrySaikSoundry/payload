'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { Hamburger, useNav } from '@payloadcms/ui';
import React from 'react';
export const NavHamburger = ()=>{
    const { navOpen } = useNav();
    return /*#__PURE__*/ _jsx(Hamburger, {
        closeIcon: "collapse",
        isActive: navOpen
    });
};

//# sourceMappingURL=index.js.map