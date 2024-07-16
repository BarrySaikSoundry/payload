import type { FormFieldBase } from '@payloadcms/ui';
import React from 'react';
type ElementButtonContextType = {
    disabled?: boolean;
    fieldProps: {
        name: string;
        richTextComponentMap: Map<string, React.ReactNode>;
    } & FormFieldBase;
    path: string;
    schemaPath: string;
};
export declare const ElementButtonProvider: React.FC<{
    children: React.ReactNode;
} & ElementButtonContextType>;
export declare const useElementButton: () => ElementButtonContextType;
export {};
//# sourceMappingURL=ElementButtonProvider.d.ts.map