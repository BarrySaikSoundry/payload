import type { FormFieldBase } from '@payloadcms/ui';
import type { LexicalEditor } from 'lexical';
import * as React from 'react';
import type { SanitizedClientEditorConfig } from '../types.js';
export interface EditorConfigContextType {
    blurEditor: (editorContext: EditorConfigContextType) => void;
    childrenEditors: React.RefObject<Map<string, EditorConfigContextType>>;
    editor: LexicalEditor;
    editorConfig: SanitizedClientEditorConfig;
    editorContainerRef: React.RefObject<HTMLDivElement>;
    field: {
        editorConfig: SanitizedClientEditorConfig;
        name: string;
        richTextComponentMap: Map<string, React.ReactNode>;
    } & FormFieldBase;
    focusEditor: (editorContext: EditorConfigContextType) => void;
    focusedEditor: EditorConfigContextType | null;
    parentEditor: EditorConfigContextType;
    registerChild: (uuid: string, editorContext: EditorConfigContextType) => void;
    unregisterChild?: (uuid: string) => void;
    uuid: string;
}
export declare const EditorConfigProvider: ({ children, editorConfig, editorContainerRef, fieldProps, parentContext, }: {
    children: React.ReactNode;
    editorConfig: SanitizedClientEditorConfig;
    editorContainerRef: React.RefObject<HTMLDivElement>;
    fieldProps: {
        editorConfig: SanitizedClientEditorConfig;
        name: string;
        richTextComponentMap: Map<string, React.ReactNode>;
    } & FormFieldBase;
    parentContext?: EditorConfigContextType;
}) => React.ReactNode;
export declare const useEditorConfigContext: () => EditorConfigContextType;
//# sourceMappingURL=EditorConfigProvider.d.ts.map