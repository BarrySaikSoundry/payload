'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js';
import * as React from 'react';
import { createContext, useContext, useMemo, useRef, useState } from 'react';
// Should always produce a 20 character pseudo-random string
function generateQuickGuid() {
    return Math.random().toString(36).substring(2, 12) + Math.random().toString(36).substring(2, 12);
}
const Context = /*#__PURE__*/ createContext({
    editorConfig: null,
    field: null,
    uuid: null
});
export const EditorConfigProvider = ({ children, editorConfig, editorContainerRef, fieldProps, parentContext })=>{
    const [editor] = useLexicalComposerContext();
    // State to store the UUID
    const [uuid] = useState(generateQuickGuid());
    const childrenEditors = useRef(new Map());
    const [focusedEditor, setFocusedEditor] = useState(null);
    const focusHistory = useRef(new Set());
    const editorContext = useMemo(()=>({
            blurEditor: (editorContext)=>{
                //setFocusedEditor(null) // Clear focused editor
                focusHistory.current.clear() // Reset focus history when focus is lost
                ;
            },
            childrenEditors,
            editor,
            editorConfig,
            editorContainerRef,
            field: fieldProps,
            focusEditor: (editorContext)=>{
                const editorUUID = editorContext.uuid;
                // Avoid recursion by checking if this editor is already focused in this cycle
                if (focusHistory.current.has(editorUUID)) {
                    return;
                }
                // Add this editor to the history to prevent future recursions in this cycle
                focusHistory.current.add(editorUUID);
                setFocusedEditor(editorContext);
                // Propagate focus event to parent and children, ensuring they do not refocus this editor
                if (parentContext?.uuid) {
                    parentContext.focusEditor(editorContext);
                }
                childrenEditors.current.forEach((childEditor, childUUID)=>{
                    childEditor.focusEditor(editorContext);
                });
                focusHistory.current.clear();
            },
            focusedEditor,
            parentEditor: parentContext,
            registerChild: (childUUID, childEditorContext)=>{
                if (!childrenEditors.current.has(childUUID)) {
                    const newMap = new Map(childrenEditors.current);
                    newMap.set(childUUID, childEditorContext);
                    childrenEditors.current = newMap;
                }
            },
            unregisterChild: (childUUID)=>{
                if (childrenEditors.current.has(childUUID)) {
                    const newMap = new Map(childrenEditors.current);
                    newMap.delete(childUUID);
                    childrenEditors.current = newMap;
                }
            },
            uuid
        }), [
        editor,
        childrenEditors,
        editorConfig,
        editorContainerRef,
        fieldProps,
        focusedEditor,
        parentContext,
        uuid
    ]);
    return /*#__PURE__*/ _jsx(Context.Provider, {
        value: editorContext,
        children: children
    });
};
export const useEditorConfigContext = ()=>{
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error('useEditorConfigContext must be used within an EditorConfigProvider');
    }
    return context;
};

//# sourceMappingURL=EditorConfigProvider.js.map