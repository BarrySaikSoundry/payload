import type { Labels } from 'payload';
import React from 'react';
import type { FieldMap, ReducedBlock } from '../../providers/ComponentMap/buildComponentMap/types.js';
export declare const RowActions: React.FC<{
    addRow: (rowIndex: number, blockType: string) => void;
    blockType: string;
    blocks: ReducedBlock[];
    duplicateRow: (rowIndex: number, blockType: string) => void;
    fieldMap: FieldMap;
    hasMaxRows?: boolean;
    isSortable?: boolean;
    labels: Labels;
    moveRow: (fromIndex: number, toIndex: number) => void;
    removeRow: (rowIndex: number) => void;
    rowCount: number;
    rowIndex: number;
}>;
//# sourceMappingURL=RowActions.d.ts.map