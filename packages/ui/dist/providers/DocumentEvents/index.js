'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useContext, useState } from 'react';
const Context = /*#__PURE__*/ createContext({
    mostRecentUpdate: null,
    reportUpdate: (doc)=>null
});
export const DocumentEventsProvider = ({ children })=>{
    const [mostRecentUpdate, reportUpdate] = useState(null);
    return /*#__PURE__*/ _jsx(Context.Provider, {
        value: {
            mostRecentUpdate,
            reportUpdate
        },
        children: children
    });
};
export const useDocumentEvents = ()=>useContext(Context);

//# sourceMappingURL=index.js.map