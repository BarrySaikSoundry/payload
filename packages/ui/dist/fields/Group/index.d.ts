import React from 'react';
import type { FieldMap } from '../../providers/ComponentMap/buildComponentMap/types.js';
import type { FormFieldBase } from '../shared/index.js';
import './index.scss';
import { GroupProvider, useGroup } from './provider.js';
export type GroupFieldProps = {
    fieldMap: FieldMap;
    forceRender?: boolean;
    hideGutter?: boolean;
    name?: string;
    width?: string;
} & FormFieldBase;
export declare const _GroupField: React.FC<GroupFieldProps>;
export { GroupProvider, useGroup };
export declare const GroupField: React.FC<GroupFieldProps>;
//# sourceMappingURL=index.d.ts.map