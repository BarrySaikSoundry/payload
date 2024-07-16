'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js';
import { TreeView } from '@lexical/react/LexicalTreeView.js';
import * as React from 'react';
export const TreeViewPlugin = ()=>{
    const [editor] = useLexicalComposerContext();
    return /*#__PURE__*/ _jsx(TreeView, {
        editor: editor,
        timeTravelButtonClassName: "debug-timetravel-button",
        timeTravelPanelButtonClassName: "debug-timetravel-panel-button",
        timeTravelPanelClassName: "debug-timetravel-panel",
        timeTravelPanelSliderClassName: "debug-timetravel-panel-slider",
        treeTypeButtonClassName: "debug-treetype-button",
        viewClassName: "tree-view-output"
    });
};

//# sourceMappingURL=index.js.map