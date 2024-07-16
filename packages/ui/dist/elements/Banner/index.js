'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LinkImport from 'next/link.js'; // TODO: abstract this out to support all routers
import React from 'react';
import './index.scss';
const Link = LinkImport.default || LinkImport;
const baseClass = 'banner';
export const Banner = ({ type = 'default', alignIcon = 'right', children, className, icon, onClick, to })=>{
    const classes = [
        baseClass,
        `${baseClass}--type-${type}`,
        className && className,
        to && `${baseClass}--has-link`,
        (to || onClick) && `${baseClass}--has-action`,
        icon && `${baseClass}--has-icon`,
        icon && `${baseClass}--align-icon-${alignIcon}`
    ].filter(Boolean).join(' ');
    let RenderedType = 'div';
    if (onClick && !to) RenderedType = 'button';
    if (to) RenderedType = Link;
    return /*#__PURE__*/ _jsxs(RenderedType, {
        className: classes,
        href: to || null,
        onClick: onClick,
        children: [
            icon && alignIcon === 'left' && /*#__PURE__*/ _jsx(React.Fragment, {
                children: icon
            }),
            /*#__PURE__*/ _jsx("span", {
                className: `${baseClass}__content`,
                children: children
            }),
            icon && alignIcon === 'right' && /*#__PURE__*/ _jsx(React.Fragment, {
                children: icon
            })
        ]
    });
};

//# sourceMappingURL=index.js.map