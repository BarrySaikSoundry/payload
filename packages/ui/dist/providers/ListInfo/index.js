'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext } from 'react';
const Context = /*#__PURE__*/ createContext({});
export const useListInfo = ()=>useContext(Context);
export const ListInfoProvider = ({ children, ...props })=>{
    return /*#__PURE__*/ _jsx(Context.Provider, {
        value: props,
        children: children
    });
};

//# sourceMappingURL=index.js.map