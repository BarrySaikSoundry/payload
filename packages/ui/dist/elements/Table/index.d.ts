import type { CellComponentProps, FieldBase, FieldTypes } from 'payload';
import React from 'react';
export * from './TableCellProvider/index.js';
import type { FieldMap } from '../../providers/ComponentMap/buildComponentMap/types.js';
import { TableCellProvider } from './TableCellProvider/index.js';
import './index.scss';
export { TableCellProvider };
export type Column = {
    Label: React.ReactNode;
    accessor: string;
    active: boolean;
    admin?: FieldBase['admin'];
    cellProps?: Partial<CellComponentProps>;
    components: {
        Cell: React.ReactNode;
        Heading: React.ReactNode;
    };
    name: FieldBase['name'];
    type: keyof FieldTypes;
};
export type Props = {
    columns?: Column[];
    customCellContext?: Record<string, unknown>;
    data: Record<string, unknown>[];
    fieldMap: FieldMap;
};
export declare const Table: React.FC<Props>;
//# sourceMappingURL=index.d.ts.map