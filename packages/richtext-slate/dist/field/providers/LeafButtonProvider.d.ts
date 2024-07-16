import type { FormFieldBase } from '@payloadcms/ui';
import React from 'react';
type LeafButtonContextType = {
    fieldProps: {
        name: string;
    } & FormFieldBase;
    path: string;
    schemaPath: string;
};
export declare const LeafButtonProvider: React.FC<{
    children: React.ReactNode;
} & LeafButtonContextType>;
export declare const useLeafButton: () => LeafButtonContextType;
export {};
//# sourceMappingURL=LeafButtonProvider.d.ts.map