'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext } from 'react';
export const EditDepthContext = /*#__PURE__*/ createContext(0);
export const EditDepthProvider = ({ children, depth })=>/*#__PURE__*/ _jsx(EditDepthContext.Provider, {
        value: depth,
        children: children
    });
export const useEditDepth = ()=>useContext(EditDepthContext);

//# sourceMappingURL=index.js.map