'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useComponentMap } from '../ComponentMap/index.js';
export { SetViewActions } from './SetViewActions/index.js';
const ActionsContext = /*#__PURE__*/ createContext({
    actions: [],
    setViewActions: ()=>{}
});
export const useActions = ()=>useContext(ActionsContext);
export const ActionsProvider = ({ children })=>{
    const [viewActions, setViewActions] = useState([]);
    const [adminActions, setAdminActions] = useState([]);
    const { componentMap: { actions } } = useComponentMap();
    useEffect(()=>{
        setAdminActions(actions || []);
    }, [
        actions
    ]);
    const combinedActions = [
        ...viewActions || [],
        ...adminActions || []
    ];
    return /*#__PURE__*/ _jsx(ActionsContext.Provider, {
        value: {
            actions: combinedActions,
            setViewActions
        },
        children: children
    });
};

//# sourceMappingURL=index.js.map