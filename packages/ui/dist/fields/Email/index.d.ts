import type { EmailField as EmailFieldType } from 'payload';
import React from 'react';
import type { FormFieldBase } from '../shared/index.js';
import './index.scss';
export type EmailFieldProps = {
    autoComplete?: string;
    name?: string;
    path?: string;
    placeholder?: EmailFieldType['admin']['placeholder'];
    width?: string;
} & FormFieldBase;
export declare const EmailField: React.FC<EmailFieldProps>;
//# sourceMappingURL=index.d.ts.map