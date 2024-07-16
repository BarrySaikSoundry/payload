'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useCallback, useContext } from 'react';
const ComponentMapContext = /*#__PURE__*/ createContext({});
export const ComponentMapProvider = ({ children, componentMap })=>{
    const getMappedFieldByPath = useCallback(({ collectionSlug, globalSlug, path })=>{
        let fieldMap;
        if (collectionSlug) {
            fieldMap = componentMap.collections[collectionSlug].fieldMap;
        }
        if (globalSlug) {
            fieldMap = componentMap.globals[globalSlug].fieldMap;
        }
        // TODO: better lookup for nested fields, etc.
        return fieldMap.find((field)=>'name' in field && field.name === path);
    }, [
        componentMap
    ]);
    const getFieldMap = useCallback(({ collectionSlug, globalSlug })=>{
        if (collectionSlug) {
            return componentMap.collections[collectionSlug].fieldMap;
        }
        if (globalSlug) {
            return componentMap.globals[globalSlug].fieldMap;
        }
        return [];
    }, [
        componentMap
    ]);
    const getComponentMap = useCallback(({ collectionSlug, globalSlug })=>{
        if (collectionSlug) {
            return componentMap.collections[collectionSlug];
        }
        if (globalSlug) {
            return componentMap.globals[globalSlug];
        }
        return {};
    }, [
        componentMap
    ]);
    return /*#__PURE__*/ _jsx(ComponentMapContext.Provider, {
        value: {
            componentMap,
            getComponentMap,
            getFieldMap,
            getMappedFieldByPath
        },
        children: children
    });
};
export const useComponentMap = ()=>useContext(ComponentMapContext);

//# sourceMappingURL=index.js.map