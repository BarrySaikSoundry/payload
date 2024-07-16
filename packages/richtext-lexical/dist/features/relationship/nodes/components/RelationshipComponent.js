'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection.js';
import { mergeRegister } from '@lexical/utils';
import { getTranslation } from '@payloadcms/translations';
import { Button, useConfig, useDocumentDrawer, usePayloadAPI, useTranslation } from '@payloadcms/ui';
import { $getNodeByKey, $getSelection, $isNodeSelection, CLICK_COMMAND, COMMAND_PRIORITY_LOW, KEY_BACKSPACE_COMMAND, KEY_DELETE_COMMAND } from 'lexical';
import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { useEditorConfigContext } from '../../../../lexical/config/client/EditorConfigProvider.js';
import { INSERT_RELATIONSHIP_WITH_DRAWER_COMMAND } from '../../drawer/commands.js';
import { $isRelationshipNode } from '../RelationshipNode.js';
const baseClass = 'lexical-relationship';
const initialParams = {
    depth: 0
};
const Component = (props)=>{
    const { children, data: { relationTo, value: id }, nodeKey } = props;
    const relationshipElemRef = useRef(null);
    const [editor] = useLexicalComposerContext();
    const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(nodeKey);
    const { field } = useEditorConfigContext();
    const { collections, routes: { api }, serverURL } = useConfig();
    const [relatedCollection, setRelatedCollection] = useState(()=>collections.find((coll)=>coll.slug === relationTo));
    const { i18n, t } = useTranslation();
    const [cacheBust, dispatchCacheBust] = useReducer((state)=>state + 1, 0);
    const [{ data }, { setParams }] = usePayloadAPI(`${serverURL}${api}/${relatedCollection.slug}/${id}`, {
        initialParams
    });
    const [DocumentDrawer, DocumentDrawerToggler, { closeDrawer }] = useDocumentDrawer({
        id,
        collectionSlug: relatedCollection.slug
    });
    const removeRelationship = useCallback(()=>{
        editor.update(()=>{
            $getNodeByKey(nodeKey).remove();
        });
    }, [
        editor,
        nodeKey
    ]);
    const updateRelationship = React.useCallback(({ doc })=>{
        setParams({
            ...initialParams,
            cacheBust
        });
        closeDrawer();
        dispatchCacheBust();
    }, [
        cacheBust,
        setParams,
        closeDrawer
    ]);
    const $onDelete = useCallback((payload)=>{
        if (isSelected && $isNodeSelection($getSelection())) {
            const event = payload;
            event.preventDefault();
            const node = $getNodeByKey(nodeKey);
            if ($isRelationshipNode(node)) {
                node.remove();
                return true;
            }
        }
        return false;
    }, [
        isSelected,
        nodeKey
    ]);
    const onClick = useCallback((payload)=>{
        const event = payload;
        // Check if relationshipElemRef.target or anything WITHIN relationshipElemRef.target was clicked
        if (event.target === relationshipElemRef.current || relationshipElemRef.current?.contains(event.target)) {
            if (event.shiftKey) {
                setSelected(!isSelected);
            } else {
                if (!isSelected) {
                    clearSelection();
                    setSelected(true);
                }
            }
            return true;
        }
        return false;
    }, [
        isSelected,
        setSelected,
        clearSelection
    ]);
    useEffect(()=>{
        return mergeRegister(editor.registerCommand(CLICK_COMMAND, onClick, COMMAND_PRIORITY_LOW), editor.registerCommand(KEY_DELETE_COMMAND, $onDelete, COMMAND_PRIORITY_LOW), editor.registerCommand(KEY_BACKSPACE_COMMAND, $onDelete, COMMAND_PRIORITY_LOW));
    }, [
        clearSelection,
        editor,
        isSelected,
        nodeKey,
        $onDelete,
        setSelected,
        onClick
    ]);
    return /*#__PURE__*/ _jsxs("div", {
        className: [
            baseClass,
            isSelected && `${baseClass}--selected`
        ].filter(Boolean).join(' '),
        contentEditable: false,
        ref: relationshipElemRef,
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: `${baseClass}__wrap`,
                children: [
                    /*#__PURE__*/ _jsx("p", {
                        className: `${baseClass}__label`,
                        children: t('fields:labelRelationship', {
                            label: getTranslation(relatedCollection.labels.singular, i18n)
                        })
                    }),
                    /*#__PURE__*/ _jsx(DocumentDrawerToggler, {
                        className: `${baseClass}__doc-drawer-toggler`,
                        children: /*#__PURE__*/ _jsx("p", {
                            className: `${baseClass}__title`,
                            children: data ? data[relatedCollection?.admin?.useAsTitle || 'id'] : id
                        })
                    })
                ]
            }),
            editor.isEditable() && /*#__PURE__*/ _jsxs("div", {
                className: `${baseClass}__actions`,
                children: [
                    /*#__PURE__*/ _jsx(Button, {
                        buttonStyle: "icon-label",
                        className: `${baseClass}__swapButton`,
                        disabled: field?.readOnly,
                        el: "div",
                        icon: "swap",
                        onClick: ()=>{
                            editor.dispatchCommand(INSERT_RELATIONSHIP_WITH_DRAWER_COMMAND, {
                                replace: {
                                    nodeKey
                                }
                            });
                        },
                        round: true,
                        tooltip: t('fields:swapRelationship')
                    }),
                    /*#__PURE__*/ _jsx(Button, {
                        buttonStyle: "icon-label",
                        className: `${baseClass}__removeButton`,
                        disabled: field?.readOnly,
                        icon: "x",
                        onClick: (e)=>{
                            e.preventDefault();
                            removeRelationship();
                        },
                        round: true,
                        tooltip: t('fields:removeRelationship')
                    })
                ]
            }),
            id && /*#__PURE__*/ _jsx(DocumentDrawer, {
                onSave: updateRelationship
            }),
            children
        ]
    });
};
export const RelationshipComponent = (props)=>{
    return /*#__PURE__*/ _jsx(Component, {
        ...props
    });
};

//# sourceMappingURL=RelationshipComponent.js.map