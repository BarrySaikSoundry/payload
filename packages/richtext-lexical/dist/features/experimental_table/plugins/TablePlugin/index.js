'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { TablePlugin as LexicalReactTablePlugin } from '@lexical/react/LexicalTablePlugin';
import { INSERT_TABLE_COMMAND, TableNode } from '@lexical/table';
import { mergeRegister } from '@lexical/utils';
import { useModal } from '@payloadcms/ui';
import { $getSelection, $isRangeSelection, COMMAND_PRIORITY_EDITOR, createCommand } from 'lexical';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as React from 'react';
import { invariant } from '../../../../lexical/utils/invariant.js';
import { FieldsDrawer } from '../../../../utilities/fieldsDrawer/Drawer.js';
export const OPEN_TABLE_DRAWER_COMMAND = createCommand('OPEN_EMBED_DRAWER_COMMAND');
export const CellContext = /*#__PURE__*/ createContext({
    cellEditorConfig: null,
    cellEditorPlugins: null,
    set: ()=>{
    // Empty
    }
});
const drawerSlug = 'lexical-table-create';
export function TableContext({ children }) {
    const [contextValue, setContextValue] = useState({
        cellEditorConfig: null,
        cellEditorPlugins: null
    });
    return /*#__PURE__*/ _jsx(CellContext.Provider, {
        value: useMemo(()=>({
                cellEditorConfig: contextValue.cellEditorConfig,
                cellEditorPlugins: contextValue.cellEditorPlugins,
                set: (cellEditorConfig, cellEditorPlugins)=>{
                    setContextValue({
                        cellEditorConfig,
                        cellEditorPlugins
                    });
                }
            }), [
            contextValue.cellEditorConfig,
            contextValue.cellEditorPlugins
        ]),
        children: children
    });
}
export const TablePlugin = ()=>{
    const [editor] = useLexicalComposerContext();
    const cellContext = useContext(CellContext);
    const { closeModal, toggleModal } = useModal();
    useEffect(()=>{
        if (!editor.hasNodes([
            TableNode
        ])) {
            invariant(false, 'TablePlugin: TableNode is not registered on editor');
        }
        return mergeRegister(editor.registerCommand(OPEN_TABLE_DRAWER_COMMAND, ()=>{
            let rangeSelection = null;
            editor.getEditorState().read(()=>{
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    rangeSelection = selection;
                }
            });
            if (rangeSelection) {
                toggleModal(drawerSlug);
            }
            return true;
        }, COMMAND_PRIORITY_EDITOR));
    }, [
        cellContext,
        editor,
        toggleModal
    ]);
    return /*#__PURE__*/ _jsxs(React.Fragment, {
        children: [
            /*#__PURE__*/ _jsx(FieldsDrawer, {
                drawerSlug: drawerSlug,
                drawerTitle: "Create Table",
                featureKey: "experimental_table",
                handleDrawerSubmit: (_fields, data)=>{
                    closeModal(drawerSlug);
                    if (!data.columns || !data.rows) {
                        return;
                    }
                    editor.dispatchCommand(INSERT_TABLE_COMMAND, {
                        columns: String(data.columns),
                        rows: String(data.rows)
                    });
                },
                schemaPathSuffix: "fields"
            }),
            /*#__PURE__*/ _jsx(LexicalReactTablePlugin, {
                hasCellBackgroundColor: false,
                hasCellMerge: true
            })
        ]
    });
};

//# sourceMappingURL=index.js.map