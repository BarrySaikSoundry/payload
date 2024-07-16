'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
const ElementButtonContext = /*#__PURE__*/ React.createContext({
    fieldProps: {},
    path: '',
    schemaPath: ''
});
export const ElementButtonProvider = (props)=>{
    const { children, ...rest } = props;
    return /*#__PURE__*/ _jsx(ElementButtonContext.Provider, {
        value: {
            ...rest
        },
        children: children
    });
};
export const useElementButton = ()=>{
    const path = React.useContext(ElementButtonContext);
    return path;
};

//# sourceMappingURL=ElementButtonProvider.js.map