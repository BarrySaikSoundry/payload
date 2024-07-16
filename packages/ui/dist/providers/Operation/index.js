'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext } from 'react';
export const OperationContext = /*#__PURE__*/ createContext('');
export const OperationProvider = ({ children, operation })=>/*#__PURE__*/ _jsx(OperationContext.Provider, {
        value: operation,
        children: children
    });
export const useOperation = ()=>useContext(OperationContext);

//# sourceMappingURL=index.js.map