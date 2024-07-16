import type { CellComponentProps, DefaultCellComponentProps } from 'payload';
import React from 'react';
import './index.scss';
export interface RelationshipCellProps extends DefaultCellComponentProps<any> {
    label: CellComponentProps['label'];
    relationTo: CellComponentProps['relationTo'];
}
export declare const RelationshipCell: React.FC<RelationshipCellProps>;
//# sourceMappingURL=index.d.ts.map