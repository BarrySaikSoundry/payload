import type { FormFieldBase } from '@payloadcms/ui';
import type { EditorState, LexicalEditor, SerializedEditorState } from 'lexical';
import * as React from 'react';
import type { SanitizedClientEditorConfig } from './config/types.js';
export type LexicalProviderProps = {
    editorConfig: SanitizedClientEditorConfig;
    fieldProps: {
        editorConfig: SanitizedClientEditorConfig;
        name: string;
        richTextComponentMap: Map<string, React.ReactNode>;
    } & FormFieldBase;
    onChange: (editorState: EditorState, editor: LexicalEditor, tags: Set<string>) => void;
    path: string;
    readOnly: boolean;
    value: SerializedEditorState;
};
export declare const LexicalProvider: React.FC<LexicalProviderProps>;
//# sourceMappingURL=LexicalProvider.d.ts.map