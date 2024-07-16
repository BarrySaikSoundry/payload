'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React, { Suspense, lazy } from 'react';
import { ShimmerEffect } from '../ShimmerEffect/index.js';
const LazyEditor = /*#__PURE__*/ lazy(()=>import('./CodeEditor.js'));
export const CodeEditor = (props)=>{
    const { height = '35vh' } = props;
    return /*#__PURE__*/ _jsx(Suspense, {
        fallback: /*#__PURE__*/ _jsx(ShimmerEffect, {
            height: height
        }),
        children: /*#__PURE__*/ _jsx(LazyEditor, {
            ...props,
            height: height
        })
    });
};

//# sourceMappingURL=index.js.map