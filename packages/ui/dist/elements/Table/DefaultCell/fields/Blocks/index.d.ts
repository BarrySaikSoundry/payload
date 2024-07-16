import type { CellComponentProps, DefaultCellComponentProps } from 'payload';
import React from 'react';
export interface BlocksCellProps extends DefaultCellComponentProps<any> {
    blocks: CellComponentProps['blocks'];
    labels: CellComponentProps['labels'];
}
export declare const BlocksCell: React.FC<BlocksCellProps>;
//# sourceMappingURL=index.d.ts.map