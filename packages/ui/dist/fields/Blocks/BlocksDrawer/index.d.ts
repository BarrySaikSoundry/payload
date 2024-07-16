import type { Labels } from 'payload';
import React from 'react';
import type { ReducedBlock } from '../../../providers/ComponentMap/buildComponentMap/types.js';
import './index.scss';
export type Props = {
    addRow: (index: number, blockType?: string) => void;
    addRowIndex: number;
    blocks: ReducedBlock[];
    drawerSlug: string;
    labels: Labels;
};
export declare const BlocksDrawer: React.FC<Props>;
//# sourceMappingURL=index.d.ts.map