import * as qs from 'qs-esm';
import React from 'react';
export type SearchParamsContext = {
    searchParams: qs.ParsedQs;
    stringifyParams: ({ params, replace }: {
        params: State;
        replace?: boolean;
    }) => string;
};
export type State = qs.ParsedQs;
export declare const SearchParamsProvider: React.FC<{
    children?: React.ReactNode;
}>;
export declare const useSearchParams: () => SearchParamsContext;
//# sourceMappingURL=index.d.ts.map