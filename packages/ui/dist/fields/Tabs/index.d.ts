import React from 'react';
import type { MappedTab } from '../../providers/ComponentMap/buildComponentMap/types.js';
import type { FormFieldBase } from '../shared/index.js';
import './index.scss';
import { TabsProvider } from './provider.js';
export { TabsProvider };
export type TabsFieldProps = {
    forceRender?: boolean;
    name?: string;
    path?: string;
    tabs?: MappedTab[];
    width?: string;
} & FormFieldBase;
export declare const TabsField: React.FC<TabsFieldProps>;
//# sourceMappingURL=index.d.ts.map