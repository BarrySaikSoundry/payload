import type { CellComponentProps, DefaultCellComponentProps } from 'payload';
import React from 'react';
export type ITableCellContext = {
    cellData: DefaultCellComponentProps['cellData'];
    cellProps?: Partial<CellComponentProps>;
    columnIndex?: number;
    customCellContext: DefaultCellComponentProps['customCellContext'];
    rowData: DefaultCellComponentProps['rowData'];
};
export declare const TableCellProvider: React.FC<{
    cellData?: DefaultCellComponentProps['cellData'];
    cellProps?: Partial<CellComponentProps>;
    children: React.ReactNode;
    columnIndex?: number;
    customCellContext?: DefaultCellComponentProps['customCellContext'];
    rowData?: DefaultCellComponentProps['rowData'];
}>;
export declare const useTableCell: () => ITableCellContext;
//# sourceMappingURL=index.d.ts.map