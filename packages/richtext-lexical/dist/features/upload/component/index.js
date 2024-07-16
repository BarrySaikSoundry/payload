'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js';
import { useLexicalNodeSelection } from '@lexical/react/useLexicalNodeSelection.js';
import { mergeRegister } from '@lexical/utils';
import { getTranslation } from '@payloadcms/translations';
import { Button, DrawerToggler, File, useConfig, useDocumentDrawer, useDrawerSlug, useModal, usePayloadAPI, useTranslation } from '@payloadcms/ui';
import { $getNodeByKey, $getSelection, $isNodeSelection, CLICK_COMMAND, COMMAND_PRIORITY_LOW, KEY_BACKSPACE_COMMAND, KEY_DELETE_COMMAND } from 'lexical';
import React, { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { useEditorConfigContext } from '../../../lexical/config/client/EditorConfigProvider.js';
import { FieldsDrawer } from '../../../utilities/fieldsDrawer/Drawer.js';
import { EnabledRelationshipsCondition } from '../../relationship/utils/EnabledRelationshipsCondition.js';
import { INSERT_UPLOAD_WITH_DRAWER_COMMAND } from '../drawer/commands.js';
import { $isUploadNode } from '../nodes/UploadNode.js';
const baseClass = 'lexical-upload';
const initialParams = {
    depth: 0
};
const Component = (props)=>{
    const { data: { fields, relationTo, value }, nodeKey } = props;
    const { collections, routes: { api }, serverURL } = useConfig();
    const uploadRef = useRef(null);
    const { closeModal } = useModal();
    const [editor] = useLexicalComposerContext();
    const [isSelected, setSelected, clearSelection] = useLexicalNodeSelection(nodeKey);
    const { editorConfig, field } = useEditorConfigContext();
    const { i18n, t } = useTranslation();
    const [cacheBust, dispatchCacheBust] = useReducer((state)=>state + 1, 0);
    const [relatedCollection] = useState(()=>collections.find((coll)=>coll.slug === relationTo));
    const drawerSlug = useDrawerSlug('upload-drawer');
    const [DocumentDrawer, DocumentDrawerToggler, { closeDrawer }] = useDocumentDrawer({
        id: value,
        collectionSlug: relatedCollection.slug
    });
    // Get the referenced document
    const [{ data }, { setParams }] = usePayloadAPI(`${serverURL}${api}/${relatedCollection.slug}/${value}`, {
        initialParams
    });
    const thumbnailSRC = data?.thumbnailURL || data?.url;
    const removeUpload = useCallback(()=>{
        editor.update(()=>{
            $getNodeByKey(nodeKey).remove();
        });
    }, [
        editor,
        nodeKey
    ]);
    const updateUpload = useCallback((data)=>{
        setParams({
            ...initialParams,
            cacheBust
        });
        dispatchCacheBust();
        closeDrawer();
    }, [
        setParams,
        cacheBust,
        closeDrawer
    ]);
    const $onDelete = useCallback((event)=>{
        if (isSelected && $isNodeSelection($getSelection())) {
            event.preventDefault();
            const node = $getNodeByKey(nodeKey);
            if ($isUploadNode(node)) {
                node.remove();
                return true;
            }
        }
        return false;
    }, [
        isSelected,
        nodeKey
    ]);
    const onClick = useCallback((event)=>{
        // Check if uploadRef.target or anything WITHIN uploadRef.target was clicked
        if (event.target === uploadRef.current || uploadRef.current?.contains(event.target)) {
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
    const hasExtraFields = editorConfig?.resolvedFeatureMap?.get('upload')?.sanitizedClientFeatureProps.collections?.[relatedCollection.slug]?.hasExtraFields;
    const onExtraFieldsDrawerSubmit = useCallback((_, data)=>{
        // Update lexical node (with key nodeKey) with new data
        editor.update(()=>{
            const uploadNode = $getNodeByKey(nodeKey);
            if (uploadNode) {
                const newData = {
                    ...uploadNode.getData(),
                    fields: data
                };
                uploadNode.setData(newData);
            }
        });
        closeModal(drawerSlug);
    }, [
        closeModal,
        editor,
        drawerSlug,
        nodeKey
    ]);
    return /*#__PURE__*/ _jsxs("div", {
        className: [
            baseClass,
            isSelected && `${baseClass}--selected`
        ].filter(Boolean).join(' '),
        contentEditable: false,
        ref: uploadRef,
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: `${baseClass}__card`,
                children: [
                    /*#__PURE__*/ _jsxs("div", {
                        className: `${baseClass}__topRow`,
                        children: [
                            /*#__PURE__*/ _jsx("div", {
                                className: `${baseClass}__thumbnail`,
                                children: thumbnailSRC ? /*#__PURE__*/ _jsx("img", {
                                    alt: data?.filename,
                                    "data-lexical-upload-id": value,
                                    "data-lexical-upload-relation-to": relationTo,
                                    src: thumbnailSRC
                                }) : /*#__PURE__*/ _jsx(File, {})
                            }),
                            /*#__PURE__*/ _jsxs("div", {
                                className: `${baseClass}__topRowRightPanel`,
                                children: [
                                    /*#__PURE__*/ _jsx("div", {
                                        className: `${baseClass}__collectionLabel`,
                                        children: getTranslation(relatedCollection.labels.singular, i18n)
                                    }),
                                    editor.isEditable() && /*#__PURE__*/ _jsxs("div", {
                                        className: `${baseClass}__actions`,
                                        children: [
                                            hasExtraFields ? /*#__PURE__*/ _jsx(DrawerToggler, {
                                                className: `${baseClass}__upload-drawer-toggler`,
                                                disabled: field?.readOnly,
                                                slug: drawerSlug,
                                                children: /*#__PURE__*/ _jsx(Button, {
                                                    buttonStyle: "icon-label",
                                                    el: "div",
                                                    icon: "edit",
                                                    onClick: (e)=>{
                                                        e.preventDefault();
                                                    },
                                                    round: true,
                                                    tooltip: t('fields:editRelationship')
                                                })
                                            }) : null,
                                            /*#__PURE__*/ _jsx(Button, {
                                                buttonStyle: "icon-label",
                                                disabled: field?.readOnly,
                                                el: "div",
                                                icon: "swap",
                                                onClick: ()=>{
                                                    editor.dispatchCommand(INSERT_UPLOAD_WITH_DRAWER_COMMAND, {
                                                        replace: {
                                                            nodeKey
                                                        }
                                                    });
                                                },
                                                round: true,
                                                tooltip: t('fields:swapUpload')
                                            }),
                                            /*#__PURE__*/ _jsx(Button, {
                                                buttonStyle: "icon-label",
                                                className: `${baseClass}__removeButton`,
                                                disabled: field?.readOnly,
                                                icon: "x",
                                                onClick: (e)=>{
                                                    e.preventDefault();
                                                    removeUpload();
                                                },
                                                round: true,
                                                tooltip: t('fields:removeUpload')
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsx("div", {
                        className: `${baseClass}__bottomRow`,
                        children: /*#__PURE__*/ _jsx(DocumentDrawerToggler, {
                            className: `${baseClass}__doc-drawer-toggler`,
                            children: /*#__PURE__*/ _jsx("strong", {
                                children: data?.filename
                            })
                        })
                    })
                ]
            }),
            value && /*#__PURE__*/ _jsx(DocumentDrawer, {
                onSave: updateUpload
            }),
            hasExtraFields ? /*#__PURE__*/ _jsx(FieldsDrawer, {
                data: fields,
                drawerSlug: drawerSlug,
                drawerTitle: t('general:editLabel', {
                    label: getTranslation(relatedCollection.labels.singular, i18n)
                }),
                featureKey: "upload",
                handleDrawerSubmit: onExtraFieldsDrawerSubmit,
                schemaPathSuffix: relatedCollection.slug
            }) : null
        ]
    });
};
export const UploadComponent = (props)=>{
    return /*#__PURE__*/ _jsx(EnabledRelationshipsCondition, {
        ...props,
        uploads: true,
        children: /*#__PURE__*/ _jsx(Component, {
            ...props
        })
    });
};

//# sourceMappingURL=index.js.map