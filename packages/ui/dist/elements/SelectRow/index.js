'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { useTableCell } from '../../elements/Table/TableCellProvider/index.js';
import { CheckboxInput } from '../../fields/Checkbox/Input.js';
import { useSelection } from '../../providers/Selection/index.js';
import './index.scss';
const baseClass = 'select-row';
export const SelectRow = ()=>{
    const { selected, setSelection } = useSelection();
    const { rowData } = useTableCell();
    return /*#__PURE__*/ _jsx(CheckboxInput, {
        checked: selected?.[rowData?.id],
        className: [
            baseClass,
            `${baseClass}__checkbox`
        ].join(' '),
        onToggle: ()=>setSelection(rowData.id)
    });
};

//# sourceMappingURL=index.js.map