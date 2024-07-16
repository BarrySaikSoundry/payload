'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React, { useId } from 'react';
import { PlusIcon } from '../../icons/Plus/index.js';
import { XIcon } from '../../icons/X/index.js';
import { useEditDepth } from '../../providers/EditDepth/index.js';
import { DraggableSortable } from '../DraggableSortable/index.js';
import { Pill } from '../Pill/index.js';
import { useTableColumns } from '../TableColumns/index.js';
import './index.scss';
const baseClass = 'column-selector';
const filterColumnFields = (fields)=>{
    return fields.filter((field)=>{
        return !field.admin?.disableListColumn;
    });
};
export const ColumnSelector = ({ collectionSlug })=>{
    const { columns, moveColumn, toggleColumn } = useTableColumns();
    const uuid = useId();
    const editDepth = useEditDepth();
    if (!columns) {
        return null;
    }
    const filteredColumns = filterColumnFields(columns);
    return /*#__PURE__*/ _jsx(DraggableSortable, {
        className: baseClass,
        ids: filteredColumns.map((col)=>col?.accessor),
        onDragEnd: ({ moveFromIndex, moveToIndex })=>{
            moveColumn({
                fromIndex: moveFromIndex,
                toIndex: moveToIndex
            });
        },
        children: filteredColumns.map((col, i)=>{
            if (!col) return null;
            const { Label, accessor, active } = col;
            if (col.accessor === '_select') return null;
            return /*#__PURE__*/ _jsx(Pill, {
                alignIcon: "left",
                "aria-checked": active,
                className: [
                    `${baseClass}__column`,
                    active && `${baseClass}__column--active`
                ].filter(Boolean).join(' '),
                draggable: true,
                icon: active ? /*#__PURE__*/ _jsx(XIcon, {}) : /*#__PURE__*/ _jsx(PlusIcon, {}),
                id: accessor,
                onClick: ()=>{
                    toggleColumn(accessor);
                },
                children: Label
            }, `${collectionSlug}-${col.name || i}${editDepth ? `-${editDepth}-` : ''}${uuid}`);
        })
    });
};

//# sourceMappingURL=index.js.map