import type { ServerProps, VisibleEntities } from 'payload';
import React from 'react';
import './index.scss';
export type DefaultTemplateProps = {
    children?: React.ReactNode;
    className?: string;
    visibleEntities: VisibleEntities;
} & ServerProps;
export declare const DefaultTemplate: React.FC<DefaultTemplateProps>;
//# sourceMappingURL=index.d.ts.map