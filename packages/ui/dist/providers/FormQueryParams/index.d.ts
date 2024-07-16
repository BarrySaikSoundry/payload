import React from 'react';
import type { Action, FormQueryParamsContext, State } from './types.js';
export type * from './types.js';
export declare const FormQueryParams: React.Context<FormQueryParamsContext>;
export declare const FormQueryParamsProvider: React.FC<{
    children: React.ReactNode;
    initialParams?: State;
}>;
export declare const useFormQueryParams: () => {
    dispatchFormQueryParams: React.Dispatch<Action>;
    formQueryParams: State;
};
//# sourceMappingURL=index.d.ts.map