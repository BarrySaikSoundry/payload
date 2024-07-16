'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
export * from './TableCellProvider/index.js';
import { useTableColumns } from '../TableColumns/index.js';
import { TableCellProvider } from './TableCellProvider/index.js';
import './index.scss';
export { TableCellProvider };
const baseClass = 'table';
export const Table = ({ columns: columnsFromProps, customCellContext, data })=>{
    const { columns: columnsFromContext } = useTableColumns();
    const columns = columnsFromProps || columnsFromContext;
    const activeColumns = columns?.filter((col)=>col?.active);
    if (!activeColumns || activeColumns.length === 0) {
        return /*#__PURE__*/ _jsx("div", {
            children: "No columns selected"
        });
    }
    return /*#__PURE__*/ _jsx("div", {
        className: baseClass,
        children: /*#__PURE__*/ _jsxs("table", {
            cellPadding: "0",
            cellSpacing: "0",
            children: [
                /*#__PURE__*/ _jsx("thead", {
                    children: /*#__PURE__*/ _jsx("tr", {
                        children: activeColumns.map((col, i)=>/*#__PURE__*/ _jsx("th", {
                                id: `heading-${col.accessor}`,
                                children: col.components.Heading
                            }, i))
                    })
                }),
                /*#__PURE__*/ _jsx("tbody", {
                    children: data && data.map((row, rowIndex)=>/*#__PURE__*/ _jsx("tr", {
                            className: `row-${rowIndex + 1}`,
                            children: activeColumns.map((col, colIndex)=>{
                                return /*#__PURE__*/ _jsx("td", {
                                    className: `cell-${col.accessor}`,
                                    children: /*#__PURE__*/ _jsx(TableCellProvider, {
                                        cellData: row[col.accessor],
                                        cellProps: col?.cellProps,
                                        columnIndex: colIndex,
                                        customCellContext: customCellContext,
                                        rowData: row,
                                        children: col.components.Cell
                                    })
                                }, colIndex);
                            })
                        }, rowIndex))
                })
            ]
        })
    });
};

//# sourceMappingURL=index.js.map