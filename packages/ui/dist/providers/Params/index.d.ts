import type { Params } from 'next/dist/shared/lib/router/utils/route-matcher.js';
import React from 'react';
interface IParamsContext extends Params {
}
export declare const ParamsProvider: React.FC<{
    children?: React.ReactNode;
}>;
export declare const useParams: () => IParamsContext;
export {};
//# sourceMappingURL=index.d.ts.map