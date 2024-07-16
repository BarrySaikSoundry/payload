import type { Option } from 'payload';
import React from 'react';
import './index.scss';
import type { FormFieldBase } from '../shared/index.js';
export type RadioFieldProps = {
    layout?: 'horizontal' | 'vertical';
    name?: string;
    onChange?: OnChange;
    options?: Option[];
    path?: string;
    value?: string;
    width?: string;
} & FormFieldBase;
export type OnChange<T = string> = (value: T) => void;
export declare const RadioGroupField: React.FC<RadioFieldProps>;
//# sourceMappingURL=index.d.ts.map