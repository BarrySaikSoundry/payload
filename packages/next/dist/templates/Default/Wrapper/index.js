'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useNav } from '@payloadcms/ui';
import React from 'react';
export const Wrapper = (props)=>{
    const { baseClass, children, className } = props;
    const { navOpen } = useNav();
    return /*#__PURE__*/ _jsx("div", {
        className: [
            baseClass,
            className,
            navOpen && `${baseClass}--nav-open`
        ].filter(Boolean).join(' '),
        children: children
    });
};

//# sourceMappingURL=index.js.map