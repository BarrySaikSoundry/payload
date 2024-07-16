'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { Button } from '../Button/index.js';
import { usePreviewURL } from './usePreviewURL.js';
const baseClass = 'preview-btn';
const DefaultPreviewButton = ()=>{
    const { generatePreviewURL, label } = usePreviewURL();
    return /*#__PURE__*/ _jsx(Button, {
        buttonStyle: "secondary",
        className: baseClass,
        // disabled={disabled}
        onClick: ()=>generatePreviewURL({
                openPreviewWindow: true
            }),
        size: "small",
        children: label
    });
};
export const PreviewButton = ({ CustomComponent })=>{
    if (CustomComponent) return CustomComponent;
    return /*#__PURE__*/ _jsx(DefaultPreviewButton, {});
};

//# sourceMappingURL=index.js.map