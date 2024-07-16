'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext } from 'react';
const Context = /*#__PURE__*/ createContext({
    isCollapsed: undefined,
    isVisible: undefined,
    isWithinCollapsible: undefined,
    toggle: ()=>{}
});
export const CollapsibleProvider = ({ children, isCollapsed, isWithinCollapsible = true, toggle })=>{
    const { isCollapsed: parentIsCollapsed, isVisible } = useCollapsible();
    const contextValue = React.useMemo(()=>{
        return {
            isCollapsed,
            isVisible: isVisible && !parentIsCollapsed,
            isWithinCollapsible,
            toggle
        };
    }, [
        isCollapsed,
        isWithinCollapsible,
        toggle,
        parentIsCollapsed,
        isVisible
    ]);
    return /*#__PURE__*/ _jsx(Context.Provider, {
        value: contextValue,
        children: children
    });
};
export const useCollapsible = ()=>useContext(Context);

//# sourceMappingURL=provider.js.map