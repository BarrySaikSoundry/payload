import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext, useState } from 'react';
export const useStepNav = ()=>useContext(Context);
export const Context = /*#__PURE__*/ createContext({});
export const StepNavProvider = ({ children })=>{
    const [stepNav, setStepNav] = useState([]);
    return /*#__PURE__*/ _jsx(Context.Provider, {
        value: {
            setStepNav,
            stepNav
        },
        children: children
    });
};

//# sourceMappingURL=context.js.map