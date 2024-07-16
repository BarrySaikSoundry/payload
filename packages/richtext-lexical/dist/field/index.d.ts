import type { FormFieldBase } from '@payloadcms/ui';
import type { EditorConfig as LexicalEditorConfig } from 'lexical';
import React from 'react';
import type { LexicalFieldAdminProps } from '../types.js';
export declare const RichTextField: React.FC<{
    admin?: LexicalFieldAdminProps;
    lexicalEditorConfig: LexicalEditorConfig;
    name: string;
    richTextComponentMap: Map<string, React.ReactNode>;
} & FormFieldBase>;
//# sourceMappingURL=index.d.ts.map