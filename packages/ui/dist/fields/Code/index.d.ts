import type { CodeField as CodeFieldType } from 'payload';
import React from 'react';
import type { FormFieldBase } from '../shared/index.js';
import './index.scss';
export type CodeFieldProps = {
    editorOptions?: CodeFieldType['admin']['editorOptions'];
    language?: CodeFieldType['admin']['language'];
    name?: string;
    path?: string;
    width: string;
} & FormFieldBase;
export declare const CodeField: React.FC<CodeFieldProps>;
//# sourceMappingURL=index.d.ts.map