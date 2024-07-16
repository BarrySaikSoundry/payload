'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React, { Fragment } from 'react';
import { useDraggableSortable } from '../useDraggableSortable/index.js';
export const DraggableSortableItem = (props)=>{
    const { id, children, disabled } = props;
    const { attributes, isDragging, listeners, setNodeRef, transform } = useDraggableSortable({
        id,
        disabled
    });
    return /*#__PURE__*/ _jsx(Fragment, {
        children: children({
            attributes: {
                ...attributes,
                style: {
                    cursor: isDragging ? 'grabbing' : 'grab'
                }
            },
            listeners,
            setNodeRef,
            transform
        })
    });
};

//# sourceMappingURL=index.js.map