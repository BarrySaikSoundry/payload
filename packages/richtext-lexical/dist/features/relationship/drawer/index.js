'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js';
import { useListDrawer } from '@payloadcms/ui';
import { $getNodeByKey, COMMAND_PRIORITY_EDITOR } from 'lexical';
import React, { useCallback, useEffect, useState } from 'react';
import { $createRelationshipNode } from '../nodes/RelationshipNode.js';
import { INSERT_RELATIONSHIP_COMMAND } from '../plugins/index.js';
import { EnabledRelationshipsCondition } from '../utils/EnabledRelationshipsCondition.js';
import { INSERT_RELATIONSHIP_WITH_DRAWER_COMMAND } from './commands.js';
const insertRelationship = ({ editor, relationTo, replaceNodeKey, value })=>{
    if (!replaceNodeKey) {
        editor.dispatchCommand(INSERT_RELATIONSHIP_COMMAND, {
            relationTo,
            value
        });
    } else {
        editor.update(()=>{
            const node = $getNodeByKey(replaceNodeKey);
            if (node) {
                node.replace($createRelationshipNode({
                    relationTo,
                    value
                }));
            }
        });
    }
};
const RelationshipDrawerComponent = ({ enabledCollectionSlugs })=>{
    const [editor] = useLexicalComposerContext();
    const [selectedCollectionSlug, setSelectedCollectionSlug] = useState(()=>enabledCollectionSlugs[0]);
    const [replaceNodeKey, setReplaceNodeKey] = useState(null);
    const [ListDrawer, ListDrawerToggler, { closeDrawer, isDrawerOpen, openDrawer }] = useListDrawer({
        collectionSlugs: enabledCollectionSlugs,
        selectedCollection: selectedCollectionSlug
    });
    useEffect(()=>{
        return editor.registerCommand(INSERT_RELATIONSHIP_WITH_DRAWER_COMMAND, (payload)=>{
            setReplaceNodeKey(payload?.replace ? payload?.replace.nodeKey : null);
            openDrawer();
            return true;
        }, COMMAND_PRIORITY_EDITOR);
    }, [
        editor,
        openDrawer
    ]);
    const onSelect = useCallback(({ collectionSlug, docID })=>{
        insertRelationship({
            editor,
            relationTo: collectionSlug,
            replaceNodeKey,
            value: docID
        });
        closeDrawer();
    }, [
        editor,
        closeDrawer,
        replaceNodeKey
    ]);
    useEffect(()=>{
        // always reset back to first option
        // TODO: this is not working, see the ListDrawer component
        setSelectedCollectionSlug(enabledCollectionSlugs[0]);
    }, [
        isDrawerOpen,
        enabledCollectionSlugs
    ]);
    return /*#__PURE__*/ _jsx(ListDrawer, {
        onSelect: onSelect
    });
};
export const RelationshipDrawer = (props)=>{
    return props?.enabledCollectionSlugs?.length > 0 ? /*#__PURE__*/ _jsx(RelationshipDrawerComponent, {
        ...props
    }) : /*#__PURE__*/ _jsx(EnabledRelationshipsCondition, {
        ...props,
        children: /*#__PURE__*/ _jsx(RelationshipDrawerComponent, {
            ...props
        })
    });
};

//# sourceMappingURL=index.js.map