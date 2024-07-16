'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from 'react';
import { useDelay } from '../../hooks/useDelay.js';
import './index.scss';
export const ShimmerEffect = ({ animationDelay = '0ms', height = '60px', width = '100%' })=>{
    return /*#__PURE__*/ _jsx("div", {
        className: "shimmer-effect",
        style: {
            height: typeof height === 'number' ? `${height}px` : height,
            width: typeof width === 'number' ? `${width}px` : width
        },
        children: /*#__PURE__*/ _jsx("div", {
            className: "shimmer-effect__shine",
            style: {
                animationDelay
            }
        })
    });
};
export const StaggeredShimmers = ({ className, count, height, renderDelay = 500, shimmerDelay = 25, shimmerItemClassName, width })=>{
    const shimmerDelayToPass = typeof shimmerDelay === 'number' ? `${shimmerDelay}ms` : shimmerDelay;
    const [hasDelayed] = useDelay(renderDelay, true);
    if (!hasDelayed) return null;
    return /*#__PURE__*/ _jsx("div", {
        className: className,
        children: [
            ...Array(count)
        ].map((_, i)=>/*#__PURE__*/ _jsx("div", {
                className: shimmerItemClassName,
                children: /*#__PURE__*/ _jsx(ShimmerEffect, {
                    animationDelay: `calc(${i} * ${shimmerDelayToPass})`,
                    height: height,
                    width: width
                })
            }, i))
    });
};

//# sourceMappingURL=index.js.map