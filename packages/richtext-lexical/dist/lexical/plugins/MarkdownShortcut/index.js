'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { MarkdownShortcutPlugin as LexicalMarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin.js';
import * as React from 'react';
import { useEditorConfigContext } from '../../config/client/EditorConfigProvider.js';
export const MarkdownShortcutPlugin = ()=>{
    const { editorConfig } = useEditorConfigContext();
    return /*#__PURE__*/ _jsx(LexicalMarkdownShortcutPlugin, {
        transformers: editorConfig.features.markdownTransformers
    });
};

//# sourceMappingURL=index.js.map