import type { FormFieldBase } from '@payloadcms/ui';
import type { Element } from 'slate';
import React from 'react';
type ElementContextType<T> = {
    attributes: Record<string, unknown>;
    children: React.ReactNode;
    editorRef: React.MutableRefObject<HTMLDivElement>;
    element: T;
    fieldProps: {
        name: string;
        richTextComponentMap: Map<string, React.ReactNode>;
    } & FormFieldBase;
    path: string;
    schemaPath: string;
};
export declare const ElementProvider: React.FC<{
    childNodes: React.ReactNode;
} & ElementContextType<Element>>;
export declare const useElement: <T>() => ElementContextType<T>;
export {};
//# sourceMappingURL=ElementProvider.d.ts.map