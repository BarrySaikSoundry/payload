'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { Hamburger, useNav } from '@payloadcms/ui';
import React from 'react';
export const NavHamburger = ({ baseClass })=>{
    const { navOpen, setNavOpen } = useNav();
    return /*#__PURE__*/ _jsx("button", {
        className: `${baseClass}__mobile-close`,
        onClick: ()=>{
            setNavOpen(false);
        },
        tabIndex: !navOpen ? -1 : undefined,
        type: "button",
        children: /*#__PURE__*/ _jsx(Hamburger, {
            isActive: true
        })
    });
};

//# sourceMappingURL=index.js.map