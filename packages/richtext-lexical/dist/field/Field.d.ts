import type { FormFieldBase } from '@payloadcms/ui';
import React from 'react';
import type { SanitizedClientEditorConfig } from '../lexical/config/types.js';
import './bundled.css';
import './index.scss';
export declare const RichText: React.FC<{
    editorConfig: SanitizedClientEditorConfig;
    name: string;
    richTextComponentMap: Map<string, React.ReactNode>;
    width?: string;
} & FormFieldBase>;
//# sourceMappingURL=Field.d.ts.map