'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useDraggable } from '@dnd-kit/core';
import { DragHandleIcon } from '@payloadcms/ui';
import React from 'react';
import { useLivePreviewContext } from '../Context/context.js';
import { ToolbarControls } from './Controls/index.js';
const baseClass = 'live-preview-toolbar';
const DraggableToolbar = (props)=>{
    const { toolbarPosition } = useLivePreviewContext();
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'live-preview-toolbar'
    });
    return /*#__PURE__*/ _jsxs("div", {
        className: [
            baseClass,
            `${baseClass}--draggable`
        ].join(' '),
        style: {
            left: `${toolbarPosition.x}px`,
            top: `${toolbarPosition.y}px`,
            ...transform ? {
                transform: transform ? `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)` : undefined
            } : {}
        },
        children: [
            /*#__PURE__*/ _jsx("button", {
                ...listeners,
                ...attributes,
                className: `${baseClass}__drag-handle`,
                ref: setNodeRef,
                type: "button",
                children: /*#__PURE__*/ _jsx(DragHandleIcon, {})
            }),
            /*#__PURE__*/ _jsx(ToolbarControls, {
                ...props
            })
        ]
    });
};
const StaticToolbar = (props)=>{
    return /*#__PURE__*/ _jsx("div", {
        className: [
            baseClass,
            `${baseClass}--static`
        ].join(' '),
        children: /*#__PURE__*/ _jsx(ToolbarControls, {
            ...props
        })
    });
};
export const LivePreviewToolbar = (props)=>{
    const { draggable } = props;
    if (draggable) {
        return /*#__PURE__*/ _jsx(DraggableToolbar, {
            ...props
        });
    }
    return /*#__PURE__*/ _jsx(StaticToolbar, {
        ...props
    });
};

//# sourceMappingURL=index.js.map