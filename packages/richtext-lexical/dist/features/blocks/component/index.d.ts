import React from 'react';
import { type BlockFields } from '../nodes/BlocksNode.js';
import './index.scss';
type Props = {
    children?: React.ReactNode;
    formData: BlockFields;
    nodeKey?: string;
    /**
     * This transformedFormData already comes wrapped in blockFieldWrapperName
     */
    transformedFormData: BlockFields;
};
export declare const BlockComponent: React.FC<Props>;
export {};
//# sourceMappingURL=index.d.ts.map