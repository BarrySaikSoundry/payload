'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
const TableCellContext = /*#__PURE__*/ React.createContext({});
export const TableCellProvider = (props)=>{
    const { cellData, cellProps, children, columnIndex, customCellContext, rowData } = props;
    const contextToInherit = useTableCell();
    return /*#__PURE__*/ _jsx(TableCellContext.Provider, {
        value: {
            cellData,
            cellProps,
            columnIndex,
            customCellContext,
            rowData,
            ...contextToInherit
        },
        children: children
    });
};
export const useTableCell = ()=>{
    const cell = React.useContext(TableCellContext);
    return cell;
};

//# sourceMappingURL=index.js.map