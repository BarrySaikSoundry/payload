import type { FieldPermissions, Labels, Row } from 'payload';
import React from 'react';
import type { UseDraggableSortableReturn } from '../../elements/DraggableSortable/useDraggableSortable/types.js';
import type { ReducedBlock } from '../../providers/ComponentMap/buildComponentMap/types.js';
type BlockFieldProps = {
    addRow: (rowIndex: number, blockType: string) => void;
    block: ReducedBlock;
    blocks: ReducedBlock[];
    duplicateRow: (rowIndex: number) => void;
    errorCount: number;
    forceRender?: boolean;
    hasMaxRows?: boolean;
    indexPath: string;
    isSortable?: boolean;
    labels: Labels;
    moveRow: (fromIndex: number, toIndex: number) => void;
    path: string;
    permissions: FieldPermissions;
    readOnly: boolean;
    removeRow: (rowIndex: number) => void;
    row: Row;
    rowCount: number;
    rowIndex: number;
    schemaPath: string;
    setCollapse: (id: string, collapsed: boolean) => void;
} & UseDraggableSortableReturn;
export declare const BlockRow: React.FC<BlockFieldProps>;
export {};
//# sourceMappingURL=BlockRow.d.ts.map