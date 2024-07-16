import type { ElementFormatType } from 'lexical';
import React from 'react';
import type { RelationshipData } from '../RelationshipNode.js';
import './index.scss';
type Props = {
    children?: React.ReactNode;
    className?: string;
    data: RelationshipData;
    format?: ElementFormatType;
    nodeKey?: string;
};
export declare const RelationshipComponent: (props: Props) => React.ReactNode;
export {};
//# sourceMappingURL=RelationshipComponent.d.ts.map