import React from 'react';
import './index.scss';
import type { FormFieldBase } from '../shared/index.js';
export type PointFieldProps = {
    name?: string;
    path?: string;
    placeholder?: string;
    step?: number;
    width?: string;
} & FormFieldBase;
export declare const _PointField: React.FC<PointFieldProps>;
export declare const PointField: React.FC<PointFieldProps>;
//# sourceMappingURL=index.d.ts.map