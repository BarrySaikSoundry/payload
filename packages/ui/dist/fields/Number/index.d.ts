import type { NumberField as NumberFieldType } from 'payload';
import React from 'react';
import type { FormFieldBase } from '../shared/index.js';
import './index.scss';
export type NumberFieldProps = {
    hasMany?: boolean;
    max?: number;
    maxRows?: number;
    min?: number;
    name?: string;
    onChange?: (e: number) => void;
    path?: string;
    placeholder?: NumberFieldType['admin']['placeholder'];
    step?: number;
    width?: string;
} & FormFieldBase;
export declare const NumberField: React.FC<NumberFieldProps>;
//# sourceMappingURL=index.d.ts.map