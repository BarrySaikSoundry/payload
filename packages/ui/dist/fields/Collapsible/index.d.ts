import React from 'react';
import './index.scss';
import type { FieldMap } from '../../providers/ComponentMap/buildComponentMap/types.js';
import type { FormFieldBase } from '../shared/index.js';
export type CollapsibleFieldProps = {
    fieldMap: FieldMap;
    initCollapsed?: boolean;
    width?: string;
} & FormFieldBase;
export declare const CollapsibleField: React.FC<CollapsibleFieldProps>;
//# sourceMappingURL=index.d.ts.map