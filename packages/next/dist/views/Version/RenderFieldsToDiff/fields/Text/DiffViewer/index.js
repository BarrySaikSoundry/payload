'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import ReactDiffViewerImport, { DiffMethod } from 'react-diff-viewer-continued';
const ReactDiffViewer = ReactDiffViewerImport.default || ReactDiffViewerImport;
export const DiffViewer = ({ comparisonToRender, diffMethod, diffStyles, placeholder, versionToRender })=>{
    return /*#__PURE__*/ _jsx(ReactDiffViewer, {
        compareMethod: DiffMethod[diffMethod],
        hideLineNumbers: true,
        newValue: typeof versionToRender !== 'undefined' ? String(versionToRender) : placeholder,
        oldValue: typeof comparisonToRender !== 'undefined' ? String(comparisonToRender) : placeholder,
        showDiffOnly: false,
        splitView: true,
        styles: diffStyles
    });
};

//# sourceMappingURL=index.js.map