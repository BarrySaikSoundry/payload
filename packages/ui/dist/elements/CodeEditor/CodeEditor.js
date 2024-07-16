'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import EditorImport from '@monaco-editor/react';
import React from 'react';
import { useTheme } from '../../providers/Theme/index.js';
import { ShimmerEffect } from '../ShimmerEffect/index.js';
import './index.scss';
const Editor = EditorImport.default || EditorImport;
const baseClass = 'code-editor';
const CodeEditor = (props)=>{
    const { className, height, options, readOnly, ...rest } = props;
    const { theme } = useTheme();
    const classes = [
        baseClass,
        className,
        rest?.defaultLanguage ? `language--${rest.defaultLanguage}` : ''
    ].filter(Boolean).join(' ');
    return /*#__PURE__*/ _jsx(Editor, {
        className: classes,
        height: height,
        loading: /*#__PURE__*/ _jsx(ShimmerEffect, {
            height: height
        }),
        options: {
            detectIndentation: true,
            minimap: {
                enabled: false
            },
            readOnly: Boolean(readOnly),
            scrollBeyondLastLine: false,
            tabSize: 2,
            wordWrap: 'on',
            ...options
        },
        theme: theme === 'dark' ? 'vs-dark' : 'vs',
        ...rest
    });
};
// eslint-disable-next-line no-restricted-exports
export default CodeEditor;

//# sourceMappingURL=CodeEditor.js.map