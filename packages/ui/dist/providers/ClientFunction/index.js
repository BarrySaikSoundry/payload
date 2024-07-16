'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
const ModifyClientFunctionContext = /*#__PURE__*/ React.createContext({
    addClientFunction: ()=>null,
    removeClientFunction: ()=>null
});
const ClientFunctionsContext = /*#__PURE__*/ React.createContext({});
export const ClientFunctionProvider = ({ children })=>{
    const [clientFunctions, setClientFunctions] = React.useState({});
    const addClientFunction = React.useCallback((args)=>{
        setClientFunctions((state)=>{
            const newState = {
                ...state
            };
            newState[args.key] = args.func;
            return newState;
        });
    }, []);
    const removeClientFunction = React.useCallback((args)=>{
        setClientFunctions((state)=>{
            const newState = {
                ...state
            };
            delete newState[args.key];
            return newState;
        });
    }, []);
    return /*#__PURE__*/ _jsx(ModifyClientFunctionContext.Provider, {
        value: {
            addClientFunction,
            removeClientFunction
        },
        children: /*#__PURE__*/ _jsx(ClientFunctionsContext.Provider, {
            value: clientFunctions,
            children: children
        })
    });
};
export const useAddClientFunction = (key, func)=>{
    const { addClientFunction, removeClientFunction } = React.useContext(ModifyClientFunctionContext);
    React.useEffect(()=>{
        addClientFunction({
            func,
            key
        });
        return ()=>{
            removeClientFunction({
                func,
                key
            });
        };
    }, [
        func,
        key,
        addClientFunction,
        removeClientFunction
    ]);
};
export const useClientFunctions = ()=>{
    return React.useContext(ClientFunctionsContext);
};

//# sourceMappingURL=index.js.map