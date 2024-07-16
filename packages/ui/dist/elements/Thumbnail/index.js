'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import './index.scss';
const baseClass = 'thumbnail';
import { File } from '../../graphics/File/index.js';
import { ShimmerEffect } from '../ShimmerEffect/index.js';
const ThumbnailContext = /*#__PURE__*/ React.createContext({
    className: '',
    filename: '',
    size: 'medium',
    src: ''
});
export const useThumbnailContext = ()=>React.useContext(ThumbnailContext);
export const Thumbnail = (props)=>{
    const { className = '', doc: { filename } = {}, fileSrc, imageCacheTag, size } = props;
    const [fileExists, setFileExists] = React.useState(undefined);
    const classNames = [
        baseClass,
        `${baseClass}--size-${size || 'medium'}`,
        className
    ].join(' ');
    React.useEffect(()=>{
        if (!fileSrc) {
            setFileExists(false);
            return;
        }
        const img = new Image();
        img.src = fileSrc;
        img.onload = ()=>{
            setFileExists(true);
        };
        img.onerror = ()=>{
            setFileExists(false);
        };
    }, [
        fileSrc
    ]);
    return /*#__PURE__*/ _jsxs("div", {
        className: classNames,
        children: [
            fileExists === undefined && /*#__PURE__*/ _jsx(ShimmerEffect, {
                height: "100%"
            }),
            fileExists && /*#__PURE__*/ _jsx("img", {
                alt: filename,
                src: `${fileSrc}${imageCacheTag ? `?${imageCacheTag}` : ''}`
            }),
            fileExists === false && /*#__PURE__*/ _jsx(File, {})
        ]
    });
};

//# sourceMappingURL=index.js.map