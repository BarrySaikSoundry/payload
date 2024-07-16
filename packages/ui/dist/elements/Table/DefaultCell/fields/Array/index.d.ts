import type { CellComponentProps, DefaultCellComponentProps } from 'payload';
import React from 'react';
export interface ArrayCellProps extends DefaultCellComponentProps<Record<string, unknown>[]> {
    labels: CellComponentProps['labels'];
}
export declare const ArrayCell: React.FC<ArrayCellProps>;
//# sourceMappingURL=index.d.ts.map