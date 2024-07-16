'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useDroppable } from '@dnd-kit/core';
import React from 'react';
const baseClass = 'toolbar-area';
export const ToolbarArea = (props)=>{
    const { children } = props;
    const { setNodeRef } = useDroppable({
        id: 'live-preview-area'
    });
    return /*#__PURE__*/ _jsx("div", {
        className: baseClass,
        ref: setNodeRef,
        children: children
    });
};

//# sourceMappingURL=index.js.map