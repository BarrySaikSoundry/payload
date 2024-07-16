'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { mergeRegister } from '@lexical/utils';
import { $getSelection } from 'lexical';
import React, { useCallback, useEffect, useState } from 'react';
import { useEditorConfigContext } from '../../../../lexical/config/client/EditorConfigProvider.js';
const baseClass = 'toolbar-popup__button';
export const ToolbarButton = ({ children, editor, item })=>{
    const [enabled, setEnabled] = useState(true);
    const [active, setActive] = useState(false);
    const [className, setClassName] = useState(baseClass);
    const editorConfigContext = useEditorConfigContext();
    const updateStates = useCallback(()=>{
        editor.getEditorState().read(()=>{
            const selection = $getSelection();
            if (item.isActive) {
                const isActive = item.isActive({
                    editor,
                    editorConfigContext,
                    selection
                });
                if (active !== isActive) {
                    setActive(isActive);
                }
            }
            if (item.isEnabled) {
                const isEnabled = item.isEnabled({
                    editor,
                    editorConfigContext,
                    selection
                });
                if (enabled !== isEnabled) {
                    setEnabled(isEnabled);
                }
            }
        });
    }, [
        active,
        editor,
        editorConfigContext,
        enabled,
        item
    ]);
    useEffect(()=>{
        updateStates();
    }, [
        updateStates
    ]);
    useEffect(()=>{
        document.addEventListener('mouseup', updateStates);
        return ()=>{
            document.removeEventListener('mouseup', updateStates);
        };
    }, [
        updateStates
    ]);
    useEffect(()=>{
        return mergeRegister(editor.registerUpdateListener(()=>{
            updateStates();
        }));
    }, [
        editor,
        updateStates
    ]);
    useEffect(()=>{
        setClassName([
            baseClass,
            enabled === false ? 'disabled' : '',
            active ? 'active' : '',
            item?.key ? `${baseClass}-` + item.key : ''
        ].filter(Boolean).join(' '));
    }, [
        enabled,
        active,
        className,
        item.key
    ]);
    return /*#__PURE__*/ _jsx("button", {
        className: className,
        onClick: ()=>{
            if (enabled !== false) {
                editor._updateTags = new Set([
                    ...editor._updateTags,
                    'toolbar'
                ]) // without setting the tags, our onSelect will not be able to trigger our onChange as focus onChanges are ignored.
                ;
                editor.focus(()=>{
                    // We need to wrap the onSelect in the callback, so the editor is properly focused before the onSelect is called.
                    item.onSelect({
                        editor,
                        isActive: active
                    });
                });
                return true;
            }
        },
        onMouseDown: (e)=>{
            // This fixes a bug where you are unable to click the button if you are in a NESTED editor (editor in blocks field in editor).
            // Thus only happens if you click on the SVG of the button. Clicking on the outside works. Related issue: https://github.com/payloadcms/payload/issues/4025
            // TODO: Find out why exactly it happens and why e.preventDefault() on the mouseDown fixes it. Write that down here, or potentially fix a root cause, if there is any.
            e.preventDefault();
        },
        type: "button",
        children: children
    });
};

//# sourceMappingURL=index.js.map