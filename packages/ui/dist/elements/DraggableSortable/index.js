'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useDroppable, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import React, { useCallback, useId } from 'react';
export const DraggableSortable = (props)=>{
    const { children, className, ids, onDragEnd } = props;
    const id = useId();
    const { setNodeRef } = useDroppable({
        id
    });
    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 5
        }
    }), useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates
    }));
    const handleDragEnd = useCallback((event)=>{
        const { active, over } = event;
        if (!active || !over) return;
        if (typeof onDragEnd === 'function') {
            onDragEnd({
                event,
                moveFromIndex: ids.findIndex((_id)=>_id === active.id),
                moveToIndex: ids.findIndex((_id)=>_id === over.id)
            });
        }
    }, [
        onDragEnd,
        ids
    ]);
    return /*#__PURE__*/ _jsx(DndContext, {
        collisionDetection: closestCenter,
        id: id,
        onDragEnd: handleDragEnd,
        sensors: sensors,
        children: /*#__PURE__*/ _jsx(SortableContext, {
            items: ids,
            children: /*#__PURE__*/ _jsx("div", {
                className: className,
                ref: setNodeRef,
                children: children
            })
        })
    });
};

//# sourceMappingURL=index.js.map