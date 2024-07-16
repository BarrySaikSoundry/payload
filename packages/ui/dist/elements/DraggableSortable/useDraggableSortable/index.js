'use client';
import { useSortable } from '@dnd-kit/sortable';
export const useDraggableSortable = (props)=>{
    const { id, disabled } = props;
    const { attributes, isDragging, listeners, setNodeRef, transform } = useSortable({
        id,
        disabled
    });
    return {
        attributes: {
            ...attributes,
            style: {
                cursor: isDragging ? 'grabbing' : 'grab'
            }
        },
        isDragging,
        listeners,
        setNodeRef,
        transform: transform && `translate3d(${transform.x}px, ${transform.y}px, 0)`
    };
};

//# sourceMappingURL=index.js.map