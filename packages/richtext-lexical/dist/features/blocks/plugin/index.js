'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js';
import { $insertNodeToNearestRoot, mergeRegister } from '@lexical/utils';
import { $getPreviousSelection, $getSelection, $isParagraphNode, $isRangeSelection, COMMAND_PRIORITY_EDITOR } from 'lexical';
import React, { useEffect } from 'react';
import { BlocksDrawerComponent } from '../drawer/index.js';
import { $createBlockNode, BlockNode } from '../nodes/BlocksNode.js';
import { INSERT_BLOCK_COMMAND } from './commands.js';
export const BlocksPlugin = ()=>{
    const [editor] = useLexicalComposerContext();
    useEffect(()=>{
        if (!editor.hasNodes([
            BlockNode
        ])) {
            throw new Error('BlocksPlugin: BlocksNode not registered on editor');
        }
        return mergeRegister(editor.registerCommand(INSERT_BLOCK_COMMAND, (payload)=>{
            editor.update(()=>{
                const selection = $getSelection() || $getPreviousSelection();
                if ($isRangeSelection(selection)) {
                    const blockNode = $createBlockNode(payload);
                    // Insert blocks node BEFORE potentially removing focusNode, as $insertNodeToNearestRoot errors if the focusNode doesn't exist
                    $insertNodeToNearestRoot(blockNode);
                    const { focus } = selection;
                    const focusNode = focus.getNode();
                    // First, delete currently selected node if it's an empty paragraph and if there are sufficient
                    // paragraph nodes (more than 1) left in the parent node, so that we don't "trap" the user
                    if ($isParagraphNode(focusNode) && focusNode.getTextContentSize() === 0 && focusNode.getParent().getChildren().filter((node)=>$isParagraphNode(node)).length > 1) {
                        focusNode.remove();
                    }
                }
            });
            return true;
        }, COMMAND_PRIORITY_EDITOR));
    }, [
        editor
    ]);
    return /*#__PURE__*/ _jsx(BlocksDrawerComponent, {});
};

//# sourceMappingURL=index.js.map