'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext } from 'react';
import { fieldComponents } from '../../fields/index.js';
const FieldComponentsContext = /*#__PURE__*/ createContext(fieldComponents);
export const FieldComponentsProvider = ({ children })=>{
    return /*#__PURE__*/ _jsx(FieldComponentsContext.Provider, {
        value: fieldComponents,
        children: children
    });
};
export const useFieldComponents = ()=>useContext(FieldComponentsContext);

//# sourceMappingURL=index.js.map