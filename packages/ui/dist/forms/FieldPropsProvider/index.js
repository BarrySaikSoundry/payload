'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
const FieldPropsContext = /*#__PURE__*/ React.createContext({
    type: undefined,
    custom: {},
    indexPath: undefined,
    path: undefined,
    permissions: {},
    readOnly: false,
    schemaPath: undefined,
    siblingPermissions: {}
});
export const FieldPropsProvider = ({ type, children, custom, indexPath, path, permissions, readOnly, schemaPath, siblingPermissions })=>{
    return /*#__PURE__*/ _jsx(FieldPropsContext.Provider, {
        value: {
            type,
            custom,
            indexPath,
            path,
            permissions,
            readOnly,
            schemaPath,
            siblingPermissions
        },
        children: children
    });
};
export const useFieldProps = ()=>{
    const props = React.useContext(FieldPropsContext);
    return props;
};

//# sourceMappingURL=index.js.map