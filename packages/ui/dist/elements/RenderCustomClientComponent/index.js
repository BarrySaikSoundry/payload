'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
export const RenderCustomClientComponent = (props)=>{
    const { CustomComponent, DefaultComponent, componentProps = {} } = props;
    if (CustomComponent) {
        return /*#__PURE__*/ _jsx(CustomComponent, {
            ...componentProps
        });
    }
    if (DefaultComponent) {
        return /*#__PURE__*/ _jsx(DefaultComponent, {
            ...componentProps
        });
    }
    return null;
};

//# sourceMappingURL=index.js.map