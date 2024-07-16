import React from 'react';
import type { MappedTab } from '../../../providers/ComponentMap/buildComponentMap/types.js';
import './index.scss';
type TabProps = {
    isActive?: boolean;
    parentPath: string;
    setIsActive: () => void;
    tab: MappedTab;
};
export declare const TabComponent: React.FC<TabProps>;
export {};
//# sourceMappingURL=index.d.ts.map