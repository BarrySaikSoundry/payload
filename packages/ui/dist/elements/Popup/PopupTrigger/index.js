'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import './index.scss';
const baseClass = 'popup-button';
export const PopupTrigger = (props)=>{
    const { active, button, buttonType, className, setActive } = props;
    const classes = [
        baseClass,
        className,
        `${baseClass}--${buttonType}`
    ].filter(Boolean).join(' ');
    const handleClick = ()=>{
        setActive(!active);
    };
    if (buttonType === 'none') {
        return null;
    }
    if (buttonType === 'custom') {
        return /*#__PURE__*/ _jsx("div", {
            className: classes,
            onClick: handleClick,
            onKeyDown: (e)=>{
                if (e.key === 'Enter') handleClick();
            },
            role: "button",
            tabIndex: 0,
            children: button
        });
    }
    return /*#__PURE__*/ _jsx("button", {
        className: classes,
        onClick: ()=>setActive(!active),
        tabIndex: 0,
        type: "button",
        children: button
    });
};

//# sourceMappingURL=index.js.map