'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary.js';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin.js';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin.js';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin.js';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin.js';
import { useTranslation } from '@payloadcms/ui';
import { BLUR_COMMAND, COMMAND_PRIORITY_LOW, FOCUS_COMMAND } from 'lexical';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { EditorPlugin } from './EditorPlugin.js';
import { useEditorConfigContext } from './config/client/EditorConfigProvider.js';
import { MarkdownShortcutPlugin } from './plugins/MarkdownShortcut/index.js';
import { SlashMenuPlugin } from './plugins/SlashMenu/index.js';
import { AddBlockHandlePlugin } from './plugins/handles/AddBlockHandlePlugin/index.js';
import { DraggableBlockPlugin } from './plugins/handles/DraggableBlockPlugin/index.js';
import { LexicalContentEditable } from './ui/ContentEditable.js';
export const LexicalEditor = (props)=>{
    const { editorConfig, editorContainerRef, onChange } = props;
    const editorConfigContext = useEditorConfigContext();
    const [editor] = useLexicalComposerContext();
    const { t } = useTranslation();
    const [floatingAnchorElem, setFloatingAnchorElem] = useState(null);
    const onRef = (_floatingAnchorElem)=>{
        if (_floatingAnchorElem !== null) {
            setFloatingAnchorElem(_floatingAnchorElem);
        }
    };
    useEffect(()=>{
        if (!editorConfigContext?.uuid) {
            console.error('Lexical Editor must be used within an EditorConfigProvider');
            return;
        }
        if (editorConfigContext?.parentEditor?.uuid) {
            editorConfigContext.parentEditor?.registerChild(editorConfigContext.uuid, editorConfigContext);
        }
        const handleFocus = ()=>{
            editorConfigContext.focusEditor(editorConfigContext);
        };
        const handleBlur = ()=>{
            editorConfigContext.blurEditor(editorConfigContext);
        };
        const unregisterFocus = editor.registerCommand(FOCUS_COMMAND, ()=>{
            handleFocus();
            return true;
        }, COMMAND_PRIORITY_LOW);
        const unregisterBlur = editor.registerCommand(BLUR_COMMAND, ()=>{
            handleBlur();
            return true;
        }, COMMAND_PRIORITY_LOW);
        return ()=>{
            unregisterFocus();
            unregisterBlur();
            editorConfigContext.parentEditor?.unregisterChild?.(editorConfigContext.uuid);
        };
    }, [
        editor,
        editorConfigContext
    ]);
    const [isSmallWidthViewport, setIsSmallWidthViewport] = useState(false);
    useEffect(()=>{
        const updateViewPortWidth = ()=>{
            const isNextSmallWidthViewport = window.matchMedia('(max-width: 768px)').matches;
            if (isNextSmallWidthViewport !== isSmallWidthViewport) {
                setIsSmallWidthViewport(isNextSmallWidthViewport);
            }
        };
        updateViewPortWidth();
        window.addEventListener('resize', updateViewPortWidth);
        return ()=>{
            window.removeEventListener('resize', updateViewPortWidth);
        };
    }, [
        isSmallWidthViewport
    ]);
    return /*#__PURE__*/ _jsxs(React.Fragment, {
        children: [
            editorConfig.features.plugins.map((plugin)=>{
                if (plugin.position === 'aboveContainer') {
                    return /*#__PURE__*/ _jsx(EditorPlugin, {
                        clientProps: plugin.clientProps,
                        plugin: plugin
                    }, plugin.key);
                }
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: "editor-container",
                ref: editorContainerRef,
                children: [
                    editorConfig.features.plugins.map((plugin)=>{
                        if (plugin.position === 'top') {
                            return /*#__PURE__*/ _jsx(EditorPlugin, {
                                clientProps: plugin.clientProps,
                                plugin: plugin
                            }, plugin.key);
                        }
                    }),
                    /*#__PURE__*/ _jsx(RichTextPlugin, {
                        ErrorBoundary: LexicalErrorBoundary,
                        contentEditable: /*#__PURE__*/ _jsx("div", {
                            className: "editor-scroller",
                            children: /*#__PURE__*/ _jsx("div", {
                                className: "editor",
                                ref: onRef,
                                children: /*#__PURE__*/ _jsx(LexicalContentEditable, {})
                            })
                        }),
                        placeholder: /*#__PURE__*/ _jsx("p", {
                            className: "editor-placeholder",
                            children: t('lexical:general:placeholder')
                        })
                    }),
                    /*#__PURE__*/ _jsx(OnChangePlugin, {
                        // Selection changes can be ignored here, reducing the
                        // frequency that the FieldComponent and Payload receive updates.
                        // Selection changes are only needed if you are saving selection state
                        ignoreSelectionChange: true,
                        onChange: (editorState, editor, tags)=>{
                            // Ignore any onChange event triggered by focus only
                            if (!tags.has('focus') || tags.size > 1) {
                                if (onChange != null) onChange(editorState, editor, tags);
                            }
                        }
                    }),
                    floatingAnchorElem && /*#__PURE__*/ _jsxs(React.Fragment, {
                        children: [
                            !isSmallWidthViewport && editor.isEditable() && /*#__PURE__*/ _jsxs(React.Fragment, {
                                children: [
                                    /*#__PURE__*/ _jsx(DraggableBlockPlugin, {
                                        anchorElem: floatingAnchorElem
                                    }),
                                    /*#__PURE__*/ _jsx(AddBlockHandlePlugin, {
                                        anchorElem: floatingAnchorElem
                                    })
                                ]
                            }),
                            editorConfig.features.plugins.map((plugin)=>{
                                if (plugin.position === 'floatingAnchorElem' && !(plugin.desktopOnly === true && isSmallWidthViewport)) {
                                    return /*#__PURE__*/ _jsx(EditorPlugin, {
                                        anchorElem: floatingAnchorElem,
                                        clientProps: plugin.clientProps,
                                        plugin: plugin
                                    }, plugin.key);
                                }
                            }),
                            editor.isEditable() && /*#__PURE__*/ _jsx(React.Fragment, {
                                children: /*#__PURE__*/ _jsx(SlashMenuPlugin, {
                                    anchorElem: floatingAnchorElem
                                })
                            })
                        ]
                    }),
                    editor.isEditable() && /*#__PURE__*/ _jsxs(React.Fragment, {
                        children: [
                            /*#__PURE__*/ _jsx(HistoryPlugin, {}),
                            editorConfig?.features?.markdownTransformers?.length > 0 && /*#__PURE__*/ _jsx(MarkdownShortcutPlugin, {})
                        ]
                    }),
                    /*#__PURE__*/ _jsx(TabIndentationPlugin, {}),
                    editorConfig.features.plugins.map((plugin)=>{
                        if (plugin.position === 'normal') {
                            return /*#__PURE__*/ _jsx(EditorPlugin, {
                                clientProps: plugin.clientProps,
                                plugin: plugin
                            }, plugin.key);
                        }
                    }),
                    editorConfig.features.plugins.map((plugin)=>{
                        if (plugin.position === 'bottom') {
                            return /*#__PURE__*/ _jsx(EditorPlugin, {
                                clientProps: plugin.clientProps,
                                plugin: plugin
                            }, plugin.key);
                        }
                    })
                ]
            }),
            editorConfig.features.plugins.map((plugin)=>{
                if (plugin.position === 'belowContainer') {
                    return /*#__PURE__*/ _jsx(EditorPlugin, {
                        clientProps: plugin.clientProps,
                        plugin: plugin
                    }, plugin.key);
                }
            })
        ]
    });
};

//# sourceMappingURL=LexicalEditor.js.map