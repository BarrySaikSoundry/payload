'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState } from 'react';
import AnimateHeightImport from 'react-animate-height';
const AnimateHeight = AnimateHeightImport.default || AnimateHeightImport;
import { ChevronIcon } from '../../icons/Chevron/index.js';
import { DragHandleIcon } from '../../icons/DragHandle/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import './index.scss';
import { CollapsibleProvider, useCollapsible } from './provider.js';
const baseClass = 'collapsible';
export { CollapsibleProvider, useCollapsible };
export const Collapsible = ({ actions, children, className, collapsibleStyle = 'default', dragHandleProps, header, initCollapsed, isCollapsed: collapsedFromProps, onToggle })=>{
    const [collapsedLocal, setCollapsedLocal] = useState(Boolean(initCollapsed));
    const [hoveringToggle, setHoveringToggle] = useState(false);
    const { isWithinCollapsible } = useCollapsible();
    const { t } = useTranslation();
    const isCollapsed = typeof collapsedFromProps === 'boolean' ? collapsedFromProps : collapsedLocal;
    const toggleCollapsible = React.useCallback(()=>{
        if (typeof onToggle === 'function') onToggle(!isCollapsed);
        setCollapsedLocal(!isCollapsed);
    }, [
        onToggle,
        isCollapsed
    ]);
    return /*#__PURE__*/ _jsx("div", {
        className: [
            baseClass,
            className,
            dragHandleProps && `${baseClass}--has-drag-handle`,
            isCollapsed && `${baseClass}--collapsed`,
            isWithinCollapsible && `${baseClass}--nested`,
            hoveringToggle && `${baseClass}--hovered`,
            `${baseClass}--style-${collapsibleStyle}`
        ].filter(Boolean).join(' '),
        children: /*#__PURE__*/ _jsxs(CollapsibleProvider, {
            isCollapsed: isCollapsed,
            toggle: toggleCollapsible,
            children: [
                /*#__PURE__*/ _jsxs("div", {
                    className: `${baseClass}__toggle-wrap`,
                    onMouseEnter: ()=>setHoveringToggle(true),
                    onMouseLeave: ()=>setHoveringToggle(false),
                    children: [
                        dragHandleProps && /*#__PURE__*/ _jsx("div", {
                            className: `${baseClass}__drag`,
                            ...dragHandleProps.attributes,
                            ...dragHandleProps.listeners,
                            children: /*#__PURE__*/ _jsx(DragHandleIcon, {})
                        }),
                        /*#__PURE__*/ _jsx("button", {
                            className: [
                                `${baseClass}__toggle`,
                                `${baseClass}__toggle--${isCollapsed ? 'collapsed' : 'open'}`
                            ].filter(Boolean).join(' '),
                            onClick: toggleCollapsible,
                            type: "button",
                            children: /*#__PURE__*/ _jsx("span", {
                                children: t('fields:toggleBlock')
                            })
                        }),
                        header && /*#__PURE__*/ _jsx("div", {
                            className: [
                                `${baseClass}__header-wrap`,
                                dragHandleProps && `${baseClass}__header-wrap--has-drag-handle`
                            ].filter(Boolean).join(' '),
                            children: header && header
                        }),
                        /*#__PURE__*/ _jsxs("div", {
                            className: `${baseClass}__actions-wrap`,
                            children: [
                                actions && /*#__PURE__*/ _jsx("div", {
                                    className: `${baseClass}__actions`,
                                    children: actions
                                }),
                                /*#__PURE__*/ _jsx("div", {
                                    className: `${baseClass}__indicator`,
                                    children: /*#__PURE__*/ _jsx(ChevronIcon, {
                                        direction: !isCollapsed ? 'up' : undefined
                                    })
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ _jsx(AnimateHeight, {
                    duration: 200,
                    height: isCollapsed ? 0 : 'auto',
                    children: /*#__PURE__*/ _jsx("div", {
                        className: `${baseClass}__content`,
                        children: children
                    })
                })
            ]
        })
    });
};

//# sourceMappingURL=index.js.map