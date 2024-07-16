import type { ArrayField as ArrayFieldType } from 'payload';
import React from 'react';
import type { FieldMap } from '../../providers/ComponentMap/buildComponentMap/types.js';
import type { FormFieldBase } from '../shared/index.js';
import './index.scss';
export type ArrayFieldProps = {
    CustomRowLabel?: React.ReactNode;
    fieldMap: FieldMap;
    forceRender?: boolean;
    isSortable?: boolean;
    labels?: ArrayFieldType['labels'];
    maxRows?: ArrayFieldType['maxRows'];
    minRows?: ArrayFieldType['minRows'];
    name?: string;
    width?: string;
} & FormFieldBase;
export declare const _ArrayField: React.FC<ArrayFieldProps>;
export declare const ArrayField: React.FC<ArrayFieldProps>;
//# sourceMappingURL=index.d.ts.map