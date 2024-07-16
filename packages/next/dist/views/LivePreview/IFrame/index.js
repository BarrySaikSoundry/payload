'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React, { forwardRef } from 'react';
import { useLivePreviewContext } from '../Context/context.js';
const baseClass = 'live-preview-iframe';
export const IFrame = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { setIframeHasLoaded, url } = props;
    const { zoom } = useLivePreviewContext();
    return /*#__PURE__*/ _jsx("iframe", {
        className: baseClass,
        onLoad: ()=>{
            setIframeHasLoaded(true);
        },
        ref: ref,
        src: url,
        style: {
            transform: typeof zoom === 'number' ? `scale(${zoom}) ` : undefined
        },
        title: url
    });
});

//# sourceMappingURL=index.js.map