import type { JSONField as JSONFieldType } from 'payload';
import React from 'react';
import './index.scss';
import type { FormFieldBase } from '../shared/index.js';
export type JSONFieldProps = {
    editorOptions?: JSONFieldType['admin']['editorOptions'];
    jsonSchema?: Record<string, unknown>;
    name?: string;
    path?: string;
    width?: string;
} & FormFieldBase;
export declare const JSONField: React.FC<JSONFieldProps>;
//# sourceMappingURL=index.d.ts.map