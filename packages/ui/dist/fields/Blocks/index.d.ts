import type { BlockField } from 'payload';
import React from 'react';
import type { ReducedBlock } from '../../providers/ComponentMap/buildComponentMap/types.js';
import type { FormFieldBase } from '../shared/index.js';
import './index.scss';
export type BlocksFieldProps = {
    blocks?: ReducedBlock[];
    forceRender?: boolean;
    isSortable?: boolean;
    labels?: BlockField['labels'];
    maxRows?: number;
    minRows?: number;
    name?: string;
    slug?: string;
    width?: string;
} & FormFieldBase;
export declare const BlocksField: React.FC<BlocksFieldProps>;
//# sourceMappingURL=index.d.ts.map