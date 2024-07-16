'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import LinkImport from 'next/link.js';
import * as React from 'react'; // TODO: abstract this out to support all routers
import './index.scss';
const Link = LinkImport.default || LinkImport;
const baseClass = 'popup-button-list';
export const ButtonGroup = ({ buttonSize = 'default', children, className, textAlign = 'left' })=>{
    const classes = [
        baseClass,
        className,
        `${baseClass}__text-align--${textAlign}`,
        `${baseClass}__button-size--${buttonSize}`
    ].filter(Boolean).join(' ');
    return /*#__PURE__*/ _jsx("div", {
        className: classes,
        children: children
    });
};
export const Button = ({ id, active, children, className, href, onClick })=>{
    const classes = [
        `${baseClass}__button`,
        active && `${baseClass}__button--selected`,
        className
    ].filter(Boolean).join(' ');
    if (href) {
        return /*#__PURE__*/ _jsx(Link, {
            className: classes,
            href: href,
            id: id,
            onClick: ()=>{
                if (onClick) {
                    onClick();
                }
            },
            children: children
        });
    }
    if (onClick) {
        return /*#__PURE__*/ _jsx("button", {
            className: classes,
            id: id,
            onClick: ()=>{
                if (onClick) {
                    onClick();
                }
            },
            type: "button",
            children: children
        });
    }
    return /*#__PURE__*/ _jsx("div", {
        className: classes,
        id: id,
        children: children
    });
};

//# sourceMappingURL=index.js.map