import type { ServerProps } from 'payload';
import React from 'react';
export type RenderCustomComponentProps = {
    CustomComponent?: React.ComponentType<any>;
    DefaultComponent: React.ComponentType<any>;
    componentProps?: Record<string, any>;
    /**
     * Server-only props automatically get added to the component if it's an RSC
     */
    serverOnlyProps?: ServerProps;
};
/**
 * If you are passing dynamic props or function props to this component,
 * you should instead use the <RenderCustomClientComponent/>
 */
export declare const RenderCustomComponent: React.FC<RenderCustomComponentProps>;
//# sourceMappingURL=index.d.ts.map