import type { CellComponentProps } from 'payload';
import React from 'react';
import type { ColumnPreferences } from '../../providers/ListInfo/index.js';
import type { Column } from '../Table/index.js';
export interface ITableColumns {
    columns: Column[];
    moveColumn: (args: {
        fromIndex: number;
        toIndex: number;
    }) => void;
    setActiveColumns: (columns: string[]) => void;
    toggleColumn: (column: string) => void;
}
export declare const TableColumnContext: React.Context<ITableColumns>;
export declare const useTableColumns: () => ITableColumns;
export type ListPreferences = {
    columns: ColumnPreferences;
};
type Props = {
    cellProps?: Partial<CellComponentProps>[];
    children: React.ReactNode;
    collectionSlug: string;
    enableRowSelections?: boolean;
    listPreferences?: ListPreferences;
    preferenceKey: string;
};
export declare const TableColumnsProvider: React.FC<Props>;
export {};
//# sourceMappingURL=index.d.ts.map