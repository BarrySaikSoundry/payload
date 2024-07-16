'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext } from 'react';
export const Context = /*#__PURE__*/ createContext(false);
export const RowProvider = ({ children, withinRow = true })=>{
    return /*#__PURE__*/ _jsx(Context.Provider, {
        value: withinRow,
        children: children
    });
};
export const useRow = ()=>useContext(Context);

//# sourceMappingURL=provider.js.map