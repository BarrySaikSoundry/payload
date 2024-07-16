'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LinkWithDefault from 'next/link.js';
const Link = LinkWithDefault.default;
import React from 'react'; // TODO: abstract this out to support all routers
import { useDraggableSortable } from '../DraggableSortable/useDraggableSortable/index.js';
import './index.scss';
const baseClass = 'pill';
const DraggablePill = (props)=>{
    const { id, className } = props;
    const { attributes, isDragging, listeners, setNodeRef, transform } = useDraggableSortable({
        id
    });
    return /*#__PURE__*/ _jsx(StaticPill, {
        ...props,
        className: [
            isDragging && `${baseClass}--is-dragging`,
            className
        ].filter(Boolean).join(' '),
        elementProps: {
            ...listeners,
            ...attributes,
            ref: setNodeRef,
            style: {
                transform
            }
        }
    });
};
const StaticPill = (props)=>{
    const { alignIcon = 'right', 'aria-checked': ariaChecked, 'aria-controls': ariaControls, 'aria-expanded': ariaExpanded, 'aria-label': ariaLabel, children, className, draggable, elementProps, icon, onClick, pillStyle = 'light', rounded, to } = props;
    const classes = [
        baseClass,
        `${baseClass}--style-${pillStyle}`,
        className && className,
        to && `${baseClass}--has-link`,
        (to || onClick) && `${baseClass}--has-action`,
        icon && `${baseClass}--has-icon`,
        icon && `${baseClass}--align-icon-${alignIcon}`,
        draggable && `${baseClass}--draggable`,
        rounded && `${baseClass}--rounded`
    ].filter(Boolean).join(' ');
    let Element = 'div';
    if (onClick && !to) Element = 'button';
    if (to) Element = Link;
    return /*#__PURE__*/ _jsxs(Element, {
        ...elementProps,
        "aria-checked": ariaChecked,
        "aria-controls": ariaControls,
        "aria-expanded": ariaExpanded,
        "aria-label": ariaLabel,
        className: classes,
        href: to || null,
        onClick: onClick,
        type: Element === 'button' ? 'button' : undefined,
        children: [
            icon && alignIcon === 'left' && /*#__PURE__*/ _jsx("span", {
                className: `${baseClass}__icon`,
                children: icon
            }),
            /*#__PURE__*/ _jsx("span", {
                className: `${baseClass}__label`,
                children: children
            }),
            icon && alignIcon === 'right' && /*#__PURE__*/ _jsx("span", {
                className: `${baseClass}__icon`,
                children: icon
            })
        ]
    });
};
export const Pill = (props)=>{
    const { draggable } = props;
    if (draggable) return /*#__PURE__*/ _jsx(DraggablePill, {
        ...props
    });
    return /*#__PURE__*/ _jsx(StaticPill, {
        ...props
    });
};

//# sourceMappingURL=index.js.map