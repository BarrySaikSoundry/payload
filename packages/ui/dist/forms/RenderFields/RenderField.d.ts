import type { FieldPermissions, FieldTypes } from 'payload';
import React from 'react';
import type { FieldComponentProps, MappedField } from '../../providers/ComponentMap/buildComponentMap/types.js';
type Props = {
    CustomField: MappedField['CustomField'];
    custom?: Record<any, string>;
    disabled: boolean;
    fieldComponentProps?: FieldComponentProps;
    indexPath?: string;
    isHidden?: boolean;
    name?: string;
    path: string;
    permissions?: FieldPermissions;
    readOnly?: boolean;
    schemaPath: string;
    siblingPermissions: {
        [fieldName: string]: FieldPermissions;
    };
    type: keyof FieldTypes;
};
export declare const RenderField: React.FC<Props>;
export {};
//# sourceMappingURL=RenderField.d.ts.map