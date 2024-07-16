import type { Description, Validate } from 'payload';
import React from 'react';
import type { FormFieldBase } from '../shared/index.js';
import './index.scss';
export type PasswordFieldProps = {
    autoComplete?: string;
    className?: string;
    description?: Description;
    disabled?: boolean;
    name: string;
    path?: string;
    required?: boolean;
    style?: React.CSSProperties;
    validate?: Validate;
    width?: string;
} & FormFieldBase;
export declare const PasswordField: React.FC<PasswordFieldProps>;
//# sourceMappingURL=index.d.ts.map