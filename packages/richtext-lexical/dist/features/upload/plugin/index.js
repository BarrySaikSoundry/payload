'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js';
import { $insertNodeToNearestRoot, mergeRegister } from '@lexical/utils';
import { useConfig } from '@payloadcms/ui';
import { $getPreviousSelection, $getSelection, $isParagraphNode, $isRangeSelection, COMMAND_PRIORITY_EDITOR, createCommand } from 'lexical';
import React, { useEffect } from 'react';
import { UploadDrawer } from '../drawer/index.js';
import { $createUploadNode, UploadNode } from '../nodes/UploadNode.js';
export const INSERT_UPLOAD_COMMAND = createCommand('INSERT_UPLOAD_COMMAND');
export const UploadPlugin = ({ clientProps })=>{
    const [editor] = useLexicalComposerContext();
    const { collections } = useConfig();
    useEffect(()=>{
        if (!editor.hasNodes([
            UploadNode
        ])) {
            throw new Error('UploadPlugin: UploadNode not registered on editor');
        }
        return mergeRegister(editor.registerCommand(INSERT_UPLOAD_COMMAND, (payload)=>{
            editor.update(()=>{
                const selection = $getSelection() || $getPreviousSelection();
                if ($isRangeSelection(selection)) {
                    const uploadNode = $createUploadNode({
                        data: {
                            id: payload.id,
                            fields: payload.fields,
                            relationTo: payload.relationTo,
                            value: payload.value
                        }
                    });
                    // Insert upload node BEFORE potentially removing focusNode, as $insertNodeToNearestRoot errors if the focusNode doesn't exist
                    $insertNodeToNearestRoot(uploadNode);
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
    return /*#__PURE__*/ _jsx(UploadDrawer, {
        enabledCollectionSlugs: collections.map(({ slug })=>slug)
    });
};

//# sourceMappingURL=index.js.map