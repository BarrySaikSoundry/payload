import type { Option } from 'payload';
import React from 'react';
import type { FormFieldBase } from '../shared/index.js';
import type { SelectInputProps } from './Input.js';
import { SelectInput } from './Input.js';
export type SelectFieldProps = {
    hasMany?: boolean;
    isClearable?: boolean;
    isSortable?: boolean;
    name?: string;
    onChange?: (e: string | string[]) => void;
    options?: Option[];
    path?: string;
    value?: string;
    width?: string;
} & FormFieldBase;
export declare const SelectField: React.FC<SelectFieldProps>;
export { SelectInput, type SelectInputProps };
//# sourceMappingURL=index.d.ts.map