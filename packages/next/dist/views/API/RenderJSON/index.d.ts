import * as React from 'react';
import './index.scss';
type Args = {
    isEmpty?: boolean;
    object: Record<string, any> | any[];
    objectKey?: string;
    parentType?: 'array' | 'object';
    trailingComma?: boolean;
};
export declare const RenderJSON: ({ isEmpty, object, objectKey, parentType, trailingComma, }: Args) => React.JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map