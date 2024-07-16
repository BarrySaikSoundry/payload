import type { FormFieldBase } from '@payloadcms/ui';
import React from 'react';
type LeafContextType = {
    attributes: Record<string, unknown>;
    children: React.ReactNode;
    editorRef: React.MutableRefObject<HTMLDivElement>;
    fieldProps: {
        name: string;
    } & FormFieldBase;
    leaf: string;
    path: string;
    schemaPath: string;
};
export declare const LeafProvider: React.FC<{
    result: React.ReactNode;
} & LeafContextType>;
export declare const useLeaf: () => LeafContextType;
export {};
//# sourceMappingURL=LeafProvider.d.ts.map