'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js';
import { mergeRegister } from '@lexical/utils';
import { $getSelection, $isRangeSelection, $isTextNode, COMMAND_PRIORITY_LOW, SELECTION_CHANGE_COMMAND } from 'lexical';
import { useCallback, useEffect, useRef, useState } from 'react';
import * as React from 'react';
import { createPortal } from 'react-dom';
import { useEditorConfigContext } from '../../../../lexical/config/client/EditorConfigProvider.js';
import { getDOMRangeRect } from '../../../../lexical/utils/getDOMRangeRect.js';
import { setFloatingElemPosition } from '../../../../lexical/utils/setFloatingElemPosition.js';
import { ToolbarButton } from '../../shared/ToolbarButton/index.js';
import { ToolbarDropdown } from '../../shared/ToolbarDropdown/index.js';
function ButtonGroupItem({ anchorElem, editor, item }) {
    if (item.Component) {
        return item?.Component && /*#__PURE__*/ _jsx(item.Component, {
            anchorElem: anchorElem,
            editor: editor,
            item: item
        }, item.key);
    }
    return /*#__PURE__*/ _jsx(ToolbarButton, {
        editor: editor,
        item: item,
        children: item?.ChildComponent && /*#__PURE__*/ _jsx(item.ChildComponent, {})
    }, item.key);
}
function ToolbarGroupComponent({ anchorElem, editor, group, index }) {
    const { editorConfig } = useEditorConfigContext();
    const [DropdownIcon, setDropdownIcon] = React.useState(null);
    React.useEffect(()=>{
        if (group?.type === 'dropdown' && group.items.length && group.ChildComponent) {
            setDropdownIcon(()=>group.ChildComponent);
        } else {
            setDropdownIcon(null);
        }
    }, [
        group
    ]);
    const onActiveChange = ({ activeItems })=>{
        if (!activeItems.length) {
            if (group?.type === 'dropdown' && group.items.length && group.ChildComponent) {
                setDropdownIcon(()=>group.ChildComponent);
            } else {
                setDropdownIcon(null);
            }
            return;
        }
        const item = activeItems[0];
        setDropdownIcon(()=>item.ChildComponent);
    };
    return /*#__PURE__*/ _jsxs("div", {
        className: `inline-toolbar-popup__group inline-toolbar-popup__group-${group.key}`,
        children: [
            group.type === 'dropdown' && group.items.length && (DropdownIcon ? /*#__PURE__*/ _jsx(ToolbarDropdown, {
                Icon: DropdownIcon,
                anchorElem: anchorElem,
                editor: editor,
                groupKey: group.key,
                items: group.items,
                maxActiveItems: 1,
                onActiveChange: onActiveChange
            }) : /*#__PURE__*/ _jsx(ToolbarDropdown, {
                anchorElem: anchorElem,
                editor: editor,
                groupKey: group.key,
                items: group.items,
                maxActiveItems: 1,
                onActiveChange: onActiveChange
            })),
            group.type === 'buttons' && group.items.length && group.items.map((item)=>{
                return /*#__PURE__*/ _jsx(ButtonGroupItem, {
                    anchorElem: anchorElem,
                    editor: editor,
                    item: item
                }, item.key);
            }),
            index < editorConfig.features.toolbarInline?.groups.length - 1 && /*#__PURE__*/ _jsx("div", {
                className: "divider"
            })
        ]
    }, group.key);
}
function InlineToolbar({ anchorElem, editor }) {
    const floatingToolbarRef = useRef(null);
    const caretRef = useRef(null);
    const { editorConfig } = useEditorConfigContext();
    const closeFloatingToolbar = useCallback(()=>{
        if (floatingToolbarRef?.current) {
            const isOpacityZero = floatingToolbarRef.current.style.opacity === '0';
            const isPointerEventsNone = floatingToolbarRef.current.style.pointerEvents === 'none';
            if (!isOpacityZero) {
                floatingToolbarRef.current.style.opacity = '0';
            }
            if (!isPointerEventsNone) {
                floatingToolbarRef.current.style.pointerEvents = 'none';
            }
        }
    }, [
        floatingToolbarRef
    ]);
    const mouseMoveListener = useCallback((e)=>{
        if (floatingToolbarRef?.current && (e.buttons === 1 || e.buttons === 3)) {
            const isOpacityZero = floatingToolbarRef.current.style.opacity === '0';
            const isPointerEventsNone = floatingToolbarRef.current.style.pointerEvents === 'none';
            if (!isOpacityZero || !isPointerEventsNone) {
                // Check if the mouse is not over the popup
                const x = e.clientX;
                const y = e.clientY;
                const elementUnderMouse = document.elementFromPoint(x, y);
                if (!floatingToolbarRef.current.contains(elementUnderMouse)) {
                    // Mouse is not over the target element => not a normal click, but probably a drag
                    closeFloatingToolbar();
                }
            }
        }
    }, [
        closeFloatingToolbar
    ]);
    const mouseUpListener = useCallback(()=>{
        if (floatingToolbarRef?.current) {
            if (floatingToolbarRef.current.style.opacity !== '1') {
                floatingToolbarRef.current.style.opacity = '1';
            }
            if (floatingToolbarRef.current.style.pointerEvents !== 'auto') {
                floatingToolbarRef.current.style.pointerEvents = 'auto';
            }
        }
    }, []);
    useEffect(()=>{
        document.addEventListener('mousemove', mouseMoveListener);
        document.addEventListener('mouseup', mouseUpListener);
        return ()=>{
            document.removeEventListener('mousemove', mouseMoveListener);
            document.removeEventListener('mouseup', mouseUpListener);
        };
    }, [
        floatingToolbarRef,
        mouseMoveListener,
        mouseUpListener
    ]);
    const $updateTextFormatFloatingToolbar = useCallback(()=>{
        const selection = $getSelection();
        const nativeSelection = window.getSelection();
        if (floatingToolbarRef.current === null) {
            return;
        }
        const possibleLinkEditor = anchorElem.querySelector(':scope > .link-editor');
        const isLinkEditorVisible = possibleLinkEditor !== null && 'style' in possibleLinkEditor && possibleLinkEditor?.style?.['opacity'] === '1';
        const rootElement = editor.getRootElement();
        if (selection !== null && nativeSelection !== null && !nativeSelection.isCollapsed && rootElement !== null && rootElement.contains(nativeSelection.anchorNode)) {
            const rangeRect = getDOMRangeRect(nativeSelection, rootElement);
            // Position floating toolbar
            const offsetIfFlipped = setFloatingElemPosition({
                alwaysDisplayOnTop: isLinkEditorVisible,
                anchorElem,
                floatingElem: floatingToolbarRef.current,
                horizontalPosition: 'center',
                targetRect: rangeRect
            });
            // Position caret
            if (caretRef.current) {
                setFloatingElemPosition({
                    anchorElem: floatingToolbarRef.current,
                    anchorFlippedOffset: offsetIfFlipped,
                    floatingElem: caretRef.current,
                    horizontalOffset: 5,
                    horizontalPosition: 'center',
                    specialHandlingForCaret: true,
                    targetRect: rangeRect,
                    verticalGap: 10
                });
            }
        } else {
            closeFloatingToolbar();
        }
    }, [
        editor,
        closeFloatingToolbar,
        anchorElem
    ]);
    useEffect(()=>{
        const scrollerElem = anchorElem.parentElement;
        const update = ()=>{
            editor.getEditorState().read(()=>{
                $updateTextFormatFloatingToolbar();
            });
        };
        window.addEventListener('resize', update);
        if (scrollerElem) {
            scrollerElem.addEventListener('scroll', update);
        }
        return ()=>{
            window.removeEventListener('resize', update);
            if (scrollerElem) {
                scrollerElem.removeEventListener('scroll', update);
            }
        };
    }, [
        editor,
        $updateTextFormatFloatingToolbar,
        anchorElem
    ]);
    useEffect(()=>{
        editor.getEditorState().read(()=>{
            $updateTextFormatFloatingToolbar();
        });
        return mergeRegister(editor.registerUpdateListener(({ editorState })=>{
            editorState.read(()=>{
                $updateTextFormatFloatingToolbar();
            });
        }), editor.registerCommand(SELECTION_CHANGE_COMMAND, ()=>{
            $updateTextFormatFloatingToolbar();
            return false;
        }, COMMAND_PRIORITY_LOW));
    }, [
        editor,
        $updateTextFormatFloatingToolbar
    ]);
    return /*#__PURE__*/ _jsxs("div", {
        className: "inline-toolbar-popup",
        ref: floatingToolbarRef,
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: "caret",
                ref: caretRef
            }),
            editor.isEditable() && /*#__PURE__*/ _jsx(React.Fragment, {
                children: editorConfig?.features && editorConfig.features?.toolbarInline?.groups.map((group, i)=>{
                    return /*#__PURE__*/ _jsx(ToolbarGroupComponent, {
                        anchorElem: anchorElem,
                        editor: editor,
                        group: group,
                        index: i
                    }, group.key);
                })
            })
        ]
    });
}
function useInlineToolbar(editor, anchorElem) {
    const [isText, setIsText] = useState(false);
    const updatePopup = useCallback(()=>{
        editor.getEditorState().read(()=>{
            // Should not to pop up the floating toolbar when using IME input
            if (editor.isComposing()) {
                return;
            }
            const selection = $getSelection();
            const nativeSelection = window.getSelection();
            const rootElement = editor.getRootElement();
            if (nativeSelection !== null && (!$isRangeSelection(selection) || rootElement === null || !rootElement.contains(nativeSelection.anchorNode))) {
                setIsText(false);
                return;
            }
            if (!$isRangeSelection(selection)) {
                return;
            }
            if (selection.getTextContent() !== '') {
                const nodes = selection.getNodes();
                let foundNodeWithText = false;
                for (const node of nodes){
                    if ($isTextNode(node)) {
                        setIsText(true);
                        foundNodeWithText = true;
                        break;
                    }
                }
                if (!foundNodeWithText) {
                    setIsText(false);
                }
            } else {
                setIsText(false);
            }
            const rawTextContent = selection.getTextContent().replace(/\n/g, '');
            if (!selection.isCollapsed() && rawTextContent === '') {
                setIsText(false);
                return;
            }
        });
    }, [
        editor
    ]);
    useEffect(()=>{
        document.addEventListener('selectionchange', updatePopup);
        document.addEventListener('mouseup', updatePopup);
        return ()=>{
            document.removeEventListener('selectionchange', updatePopup);
            document.removeEventListener('mouseup', updatePopup);
        };
    }, [
        updatePopup
    ]);
    useEffect(()=>{
        return mergeRegister(editor.registerUpdateListener(()=>{
            updatePopup();
        }), editor.registerRootListener(()=>{
            if (editor.getRootElement() === null) {
                setIsText(false);
            }
        }));
    }, [
        editor,
        updatePopup
    ]);
    if (!isText) {
        return null;
    }
    return /*#__PURE__*/ createPortal(/*#__PURE__*/ _jsx(InlineToolbar, {
        anchorElem: anchorElem,
        editor: editor
    }), anchorElem);
}
export const InlineToolbarPlugin = ({ anchorElem })=>{
    const [editor] = useLexicalComposerContext();
    return useInlineToolbar(editor, anchorElem);
};

//# sourceMappingURL=index.js.map