import React from 'react';
import './index.scss';
export type DescriptionFunction = () => string;
export type DescriptionComponent = React.ComponentType<any>;
type Description = DescriptionComponent | DescriptionFunction | Record<string, string> | string;
export type ViewDescriptionProps = {
    description?: Description;
};
export declare function isComponent(description: Description): description is DescriptionComponent;
export declare const ViewDescription: React.FC<ViewDescriptionProps>;
export {};
//# sourceMappingURL=index.d.ts.map