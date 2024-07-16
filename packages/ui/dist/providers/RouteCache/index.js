'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { usePathname, useRouter } from 'next/navigation.js';
import React, { createContext, useCallback, useContext, useEffect } from 'react';
const Context = /*#__PURE__*/ createContext({
    clearRouteCache: ()=>{}
});
export const RouteCache = ({ children })=>{
    const pathname = usePathname();
    const router = useRouter();
    const clearRouteCache = useCallback(()=>{
        router.refresh();
    }, [
        router
    ]);
    useEffect(()=>{
        clearRouteCache();
    }, [
        pathname,
        clearRouteCache
    ]);
    return /*#__PURE__*/ _jsx(Context.Provider, {
        value: {
            clearRouteCache
        },
        children: children
    });
};
export const useRouteCache = ()=>useContext(Context);

//# sourceMappingURL=index.js.map