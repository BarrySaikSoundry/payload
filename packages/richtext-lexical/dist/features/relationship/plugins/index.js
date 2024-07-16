'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js';
import { $insertNodeToNearestRoot } from '@lexical/utils';
import { useConfig } from '@payloadcms/ui';
import { $getPreviousSelection, $getSelection, $isParagraphNode, $isRangeSelection, COMMAND_PRIORITY_EDITOR, createCommand } from 'lexical';
import React, { useEffect } from 'react';
import { RelationshipDrawer } from '../drawer/index.js';
import { $createRelationshipNode, RelationshipNode } from '../nodes/RelationshipNode.js';
export const INSERT_RELATIONSHIP_COMMAND = createCommand('INSERT_RELATIONSHIP_COMMAND');
export const RelationshipPlugin = ({ clientProps })=>{
    const [editor] = useLexicalComposerContext();
    const { collections } = useConfig();
    let enabledRelations = null;
    if (clientProps?.enabledCollections) {
        enabledRelations = clientProps?.enabledCollections;
    } else if (clientProps?.disabledCollections) {
        enabledRelations = collections.filter(({ slug })=>!clientProps?.disabledCollections?.includes(slug)).map(({ slug })=>slug);
    }
    useEffect(()=>{
        if (!editor.hasNodes([
            RelationshipNode
        ])) {
            throw new Error('RelationshipPlugin: RelationshipNode not registered on editor');
        }
        return editor.registerCommand(INSERT_RELATIONSHIP_COMMAND, (payload)=>{
            const selection = $getSelection() || $getPreviousSelection();
            if ($isRangeSelection(selection)) {
                const relationshipNode = $createRelationshipNode(payload);
                // Insert relationship node BEFORE potentially removing focusNode, as $insertNodeToNearestRoot errors if the focusNode doesn't exist
                $insertNodeToNearestRoot(relationshipNode);
                const { focus } = selection;
                const focusNode = focus.getNode();
                // First, delete currently selected node if it's an empty paragraph and if there are sufficient
                // paragraph nodes (more than 1) left in the parent node, so that we don't "trap" the user
                if ($isParagraphNode(focusNode) && focusNode.getTextContentSize() === 0 && focusNode.getParent().getChildren().filter((node)=>$isParagraphNode(node)).length > 1) {
                    focusNode.remove();
                }
            }
            return true;
        }, COMMAND_PRIORITY_EDITOR);
    }, [
        editor
    ]);
    return /*#__PURE__*/ _jsx(RelationshipDrawer, {
        enabledCollectionSlugs: enabledRelations
    });
};

//# sourceMappingURL=index.js.map