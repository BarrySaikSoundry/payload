'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext } from 'react';
const Context = /*#__PURE__*/ createContext({});
export const ConfigProvider = ({ children, config })=>{
    return /*#__PURE__*/ _jsx(Context.Provider, {
        value: config,
        children: children
    });
};
export const useConfig = ()=>useContext(Context);

//# sourceMappingURL=index.js.map