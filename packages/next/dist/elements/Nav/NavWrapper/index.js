'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useNav } from '@payloadcms/ui';
import React from 'react';
export const NavWrapper = (props)=>{
    const { baseClass, children } = props;
    const { navOpen, navRef } = useNav();
    return /*#__PURE__*/ _jsx("aside", {
        className: [
            baseClass,
            navOpen && `${baseClass}--nav-open`
        ].filter(Boolean).join(' '),
        children: /*#__PURE__*/ _jsx("div", {
            className: `${baseClass}__scroll`,
            ref: navRef,
            children: children
        })
    });
};

//# sourceMappingURL=index.js.map