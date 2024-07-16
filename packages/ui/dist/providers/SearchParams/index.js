'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useSearchParams as useNextSearchParams } from 'next/navigation.js';
import * as qs from 'qs-esm';
import React, { createContext, useContext } from 'react';
const initialContext = {
    searchParams: {},
    stringifyParams: ()=>''
};
const Context = /*#__PURE__*/ createContext(initialContext);
function createParams(search) {
    return qs.parse(search, {
        depth: 10,
        ignoreQueryPrefix: true
    });
}
// TODO: abstract the `next/navigation` dependency out from this provider so that it can be used in other contexts
export const SearchParamsProvider = ({ children })=>{
    const nextSearchParams = useNextSearchParams();
    const searchString = nextSearchParams.toString();
    const initialParams = createParams(searchString);
    const [searchParams, setSearchParams] = React.useState(initialParams);
    const stringifyParams = React.useCallback(({ params, replace = false })=>{
        return qs.stringify({
            ...replace ? {} : searchParams,
            ...params
        }, {
            addQueryPrefix: true
        });
    }, [
        searchParams
    ]);
    React.useEffect(()=>{
        setSearchParams(createParams(searchString));
    }, [
        searchString
    ]);
    return /*#__PURE__*/ _jsx(Context.Provider, {
        value: {
            searchParams,
            stringifyParams
        },
        children: children
    });
};
export const useSearchParams = ()=>useContext(Context);

//# sourceMappingURL=index.js.map