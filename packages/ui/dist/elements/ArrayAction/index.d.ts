import React from 'react';
import './index.scss';
export type Props = {
    addRow: (current: number, blockType?: string) => void;
    duplicateRow: (current: number) => void;
    hasMaxRows: boolean;
    index: number;
    isSortable?: boolean;
    moveRow: (from: number, to: number) => void;
    removeRow: (index: number) => void;
    rowCount: number;
};
export declare const ArrayAction: React.FC<Props>;
//# sourceMappingURL=index.d.ts.map