'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import { Button, useConfig, useDocumentDrawer, useListDrawer, usePayloadAPI, useTranslation } from '@payloadcms/ui';
import React, { useCallback, useReducer, useState } from 'react';
import { Transforms } from 'slate';
import { ReactEditor, useFocused, useSelected, useSlateStatic } from 'slate-react';
import { useElement } from '../../../providers/ElementProvider.js';
import { EnabledRelationshipsCondition } from '../../EnabledRelationshipsCondition.js';
import './index.scss';
const baseClass = 'rich-text-relationship';
const initialParams = {
    depth: 0
};
const RelationshipElement = ()=>{
    const { attributes, children, element, element: { relationTo, value }, fieldProps } = useElement();
    const { collections, routes: { api }, serverURL } = useConfig();
    const [enabledCollectionSlugs] = useState(()=>collections.filter(({ admin: { enableRichTextRelationship } })=>enableRichTextRelationship).map(({ slug })=>slug));
    const [relatedCollection, setRelatedCollection] = useState(()=>collections.find((coll)=>coll.slug === relationTo));
    const selected = useSelected();
    const focused = useFocused();
    const { i18n, t } = useTranslation();
    const editor = useSlateStatic();
    const [cacheBust, dispatchCacheBust] = useReducer((state)=>state + 1, 0);
    const [{ data }, { setParams }] = usePayloadAPI(`${serverURL}${api}/${relatedCollection.slug}/${value?.id}`, {
        initialParams
    });
    const [DocumentDrawer, DocumentDrawerToggler, { closeDrawer }] = useDocumentDrawer({
        id: value?.id,
        collectionSlug: relatedCollection.slug
    });
    const [ListDrawer, ListDrawerToggler, { closeDrawer: closeListDrawer }] = useListDrawer({
        collectionSlugs: enabledCollectionSlugs,
        selectedCollection: relatedCollection.slug
    });
    const removeRelationship = useCallback(()=>{
        const elementPath = ReactEditor.findPath(editor, element);
        Transforms.removeNodes(editor, {
            at: elementPath
        });
    }, [
        editor,
        element
    ]);
    const updateRelationship = React.useCallback(({ doc })=>{
        const elementPath = ReactEditor.findPath(editor, element);
        Transforms.setNodes(editor, {
            type: 'relationship',
            children: [
                {
                    text: ' '
                }
            ],
            relationTo: relatedCollection.slug,
            value: {
                id: doc.id
            }
        }, {
            at: elementPath
        });
        setParams({
            ...initialParams,
            cacheBust
        });
        closeDrawer();
        dispatchCacheBust();
    }, [
        editor,
        element,
        relatedCollection,
        cacheBust,
        setParams,
        closeDrawer
    ]);
    const swapRelationship = React.useCallback(({ collectionSlug, docID })=>{
        const elementPath = ReactEditor.findPath(editor, element);
        Transforms.setNodes(editor, {
            type: 'relationship',
            children: [
                {
                    text: ' '
                }
            ],
            relationTo: collectionSlug,
            value: {
                id: docID
            }
        }, {
            at: elementPath
        });
        setRelatedCollection(collections.find((coll)=>coll.slug === collectionSlug));
        setParams({
            ...initialParams,
            cacheBust
        });
        closeListDrawer();
        dispatchCacheBust();
    }, [
        closeListDrawer,
        editor,
        element,
        cacheBust,
        setParams,
        collections
    ]);
    return /*#__PURE__*/ _jsxs("div", {
        className: [
            baseClass,
            selected && focused && `${baseClass}--selected`
        ].filter(Boolean).join(' '),
        contentEditable: false,
        ...attributes,
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
                            children: data[relatedCollection?.admin?.useAsTitle || 'id']
                        })
                    })
                ]
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: `${baseClass}__actions`,
                children: [
                    /*#__PURE__*/ _jsx(ListDrawerToggler, {
                        className: `${baseClass}__list-drawer-toggler`,
                        disabled: fieldProps?.readOnly,
                        children: /*#__PURE__*/ _jsx(Button, {
                            buttonStyle: "icon-label",
                            disabled: fieldProps?.readOnly,
                            el: "div",
                            icon: "swap",
                            onClick: ()=>{
                            // do nothing
                            },
                            round: true,
                            tooltip: t('fields:swapRelationship')
                        })
                    }),
                    /*#__PURE__*/ _jsx(Button, {
                        buttonStyle: "icon-label",
                        className: `${baseClass}__removeButton`,
                        disabled: fieldProps?.readOnly,
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
            value?.id && /*#__PURE__*/ _jsx(DocumentDrawer, {
                onSave: updateRelationship
            }),
            /*#__PURE__*/ _jsx(ListDrawer, {
                onSelect: swapRelationship
            }),
            children
        ]
    });
};
export const Element = (props)=>{
    return /*#__PURE__*/ _jsx(EnabledRelationshipsCondition, {
        ...props,
        children: /*#__PURE__*/ _jsx(RelationshipElement, {
            ...props
        })
    });
};

//# sourceMappingURL=index.js.map