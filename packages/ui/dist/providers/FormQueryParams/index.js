'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext } from 'react';
import { useLocale } from '../Locale/index.js';
export const FormQueryParams = /*#__PURE__*/ createContext({});
export const FormQueryParamsProvider = ({ children, initialParams: formQueryParamsFromProps })=>{
    const [formQueryParams, dispatchFormQueryParams] = React.useReducer((state, action)=>{
        const newState = {
            ...state
        };
        switch(action.type){
            case 'SET':
                if (action.params?.uploadEdits === null && newState?.uploadEdits) {
                    delete newState.uploadEdits;
                }
                if (action.params?.uploadEdits?.crop === null && newState?.uploadEdits?.crop) {
                    delete newState.uploadEdits.crop;
                }
                if (action.params?.uploadEdits?.focalPoint === null && newState?.uploadEdits?.focalPoint) {
                    delete newState.uploadEdits.focalPoint;
                }
                return {
                    ...newState,
                    ...action.params
                };
            default:
                return state;
        }
    }, formQueryParamsFromProps || {});
    const locale = useLocale();
    React.useEffect(()=>{
        if (locale?.code) {
            dispatchFormQueryParams({
                type: 'SET',
                params: {
                    locale: locale.code
                }
            });
        }
    }, [
        locale.code
    ]);
    return /*#__PURE__*/ _jsx(FormQueryParams.Provider, {
        value: {
            dispatchFormQueryParams,
            formQueryParams
        },
        children: children
    });
};
export const useFormQueryParams = ()=>useContext(FormQueryParams);

//# sourceMappingURL=index.js.map