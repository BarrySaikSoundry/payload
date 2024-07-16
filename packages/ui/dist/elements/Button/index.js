'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { Fragment, forwardRef, isValidElement } from 'react';
import { ChevronIcon } from '../../icons/Chevron/index.js';
import { EditIcon } from '../../icons/Edit/index.js';
import { LinkIcon } from '../../icons/Link/index.js';
import { PlusIcon } from '../../icons/Plus/index.js';
import { SwapIcon } from '../../icons/Swap/index.js';
import { XIcon } from '../../icons/X/index.js';
import { Tooltip } from '../Tooltip/index.js';
import './index.scss';
const icons = {
    chevron: ChevronIcon,
    edit: EditIcon,
    link: LinkIcon,
    plus: PlusIcon,
    swap: SwapIcon,
    x: XIcon
};
const baseClass = 'btn';
export const ButtonContents = ({ children, icon, showTooltip, tooltip })=>{
    const BuiltInIcon = icons[icon];
    return /*#__PURE__*/ _jsxs(Fragment, {
        children: [
            tooltip && /*#__PURE__*/ _jsx(Tooltip, {
                className: `${baseClass}__tooltip`,
                show: showTooltip,
                children: tooltip
            }),
            /*#__PURE__*/ _jsxs("span", {
                className: `${baseClass}__content`,
                children: [
                    children && /*#__PURE__*/ _jsx("span", {
                        className: `${baseClass}__label`,
                        children: children
                    }),
                    icon && /*#__PURE__*/ _jsxs("span", {
                        className: `${baseClass}__icon`,
                        children: [
                            /*#__PURE__*/ isValidElement(icon) && icon,
                            BuiltInIcon && /*#__PURE__*/ _jsx(BuiltInIcon, {})
                        ]
                    })
                ]
            })
        ]
    });
};
export const Button = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { id, type = 'button', Link, 'aria-label': ariaLabel, buttonStyle = 'primary', children, className, disabled, el = 'button', icon, iconPosition = 'right', iconStyle = 'without-border', newTab, onClick, round, size = 'medium', to, tooltip, url } = props;
    const [showTooltip, setShowTooltip] = React.useState(false);
    const classes = [
        baseClass,
        className && className,
        buttonStyle && `${baseClass}--style-${buttonStyle}`,
        icon && `${baseClass}--icon`,
        iconStyle && `${baseClass}--icon-style-${iconStyle}`,
        icon && !children && `${baseClass}--icon-only`,
        disabled && `${baseClass}--disabled`,
        round && `${baseClass}--round`,
        size && `${baseClass}--size-${size}`,
        iconPosition && `${baseClass}--icon-position-${iconPosition}`,
        tooltip && `${baseClass}--has-tooltip`
    ].filter(Boolean).join(' ');
    function handleClick(event) {
        setShowTooltip(false);
        if (type !== 'submit' && onClick) event.preventDefault();
        if (onClick) onClick(event);
    }
    const buttonProps = {
        id,
        type,
        'aria-disabled': disabled,
        'aria-label': ariaLabel,
        className: classes,
        disabled,
        onClick: !disabled ? handleClick : undefined,
        onMouseEnter: tooltip ? ()=>setShowTooltip(true) : undefined,
        onMouseLeave: tooltip ? ()=>setShowTooltip(false) : undefined,
        rel: newTab ? 'noopener noreferrer' : undefined,
        target: newTab ? '_blank' : undefined
    };
    switch(el){
        case 'link':
            if (!Link) {
                console.error('Link is required when using el="link"', children);
                return null;
            }
            return /*#__PURE__*/ _jsx(Link, {
                ...buttonProps,
                href: to || url,
                to: to || url,
                children: /*#__PURE__*/ _jsx(ButtonContents, {
                    icon: icon,
                    showTooltip: showTooltip,
                    tooltip: tooltip,
                    children: children
                })
            });
        case 'anchor':
            return /*#__PURE__*/ _jsx("a", {
                ...buttonProps,
                href: url,
                ref: ref,
                children: /*#__PURE__*/ _jsx(ButtonContents, {
                    icon: icon,
                    showTooltip: showTooltip,
                    tooltip: tooltip,
                    children: children
                })
            });
        default:
            const Tag = el // eslint-disable-line no-case-declarations
            ;
            return /*#__PURE__*/ _jsx(Tag, {
                ref: ref,
                type: "submit",
                ...buttonProps,
                children: /*#__PURE__*/ _jsx(ButtonContents, {
                    icon: icon,
                    showTooltip: showTooltip,
                    tooltip: tooltip,
                    children: children
                })
            });
    }
});

//# sourceMappingURL=index.js.map