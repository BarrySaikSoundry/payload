import type { FieldPermissions, FieldTypes } from 'payload';
import React from 'react';
export type FieldPropsContextType = {
    custom?: Record<any, string>;
    indexPath?: string;
    path: string;
    permissions?: FieldPermissions;
    readOnly: boolean;
    schemaPath: string;
    siblingPermissions: {
        [fieldName: string]: FieldPermissions;
    };
    type: keyof FieldTypes;
};
export type Props = {
    children: React.ReactNode;
    custom?: Record<any, string>;
    indexPath?: string;
    isForceRendered?: boolean;
    path: string;
    permissions?: FieldPermissions;
    readOnly: boolean;
    schemaPath: string;
    siblingPermissions: {
        [fieldName: string]: FieldPermissions;
    };
    type: keyof FieldTypes;
};
export declare const FieldPropsProvider: React.FC<Props>;
export declare const useFieldProps: () => FieldPropsContextType;
//# sourceMappingURL=index.d.ts.map