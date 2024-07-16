'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useParams as useNextParams } from 'next/navigation.js';
import React, { createContext, useContext } from 'react';
const Context = /*#__PURE__*/ createContext({});
// TODO: abstract the `next/navigation` dependency out from this provider so that it can be used in other contexts
export const ParamsProvider = ({ children })=>{
    const params = useNextParams();
    return /*#__PURE__*/ _jsx(Context.Provider, {
        value: params,
        children: children
    });
};
export const useParams = ()=>useContext(Context);

//# sourceMappingURL=index.js.map