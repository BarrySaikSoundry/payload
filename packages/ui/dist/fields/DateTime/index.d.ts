import type { DateField } from 'payload';
import React from 'react';
import './index.scss';
import type { FormFieldBase } from '../shared/index.js';
export type DateFieldProps = {
    date?: DateField['admin']['date'];
    name?: string;
    path?: string;
    placeholder?: DateField['admin']['placeholder'] | string;
    width?: string;
} & FormFieldBase;
export declare const DateTimeField: React.FC<DateFieldProps>;
//# sourceMappingURL=index.d.ts.map