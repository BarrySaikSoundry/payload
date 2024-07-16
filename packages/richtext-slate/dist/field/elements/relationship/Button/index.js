'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useListDrawer, useTranslation } from '@payloadcms/ui';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { ReactEditor, useSlate } from 'slate-react';
import { RelationshipIcon } from '../../../icons/Relationship/index.js';
import { ElementButton } from '../../Button.js';
import { EnabledRelationshipsCondition } from '../../EnabledRelationshipsCondition.js';
import { injectVoidElement } from '../../injectVoid.js';
import './index.scss';
const baseClass = 'relationship-rich-text-button';
const insertRelationship = (editor, { relationTo, value })=>{
    const text = {
        text: ' '
    };
    const relationship = {
        type: 'relationship',
        children: [
            text
        ],
        relationTo,
        value
    };
    injectVoidElement(editor, relationship);
    ReactEditor.focus(editor);
};
const RelationshipButton = ({ enabledCollectionSlugs })=>{
    const { t } = useTranslation();
    const editor = useSlate();
    const [selectedCollectionSlug, setSelectedCollectionSlug] = useState(()=>enabledCollectionSlugs[0]);
    const [ListDrawer, ListDrawerToggler, { closeDrawer, isDrawerOpen }] = useListDrawer({
        collectionSlugs: enabledCollectionSlugs,
        selectedCollection: selectedCollectionSlug
    });
    const onSelect = useCallback(({ collectionSlug, docID })=>{
        insertRelationship(editor, {
            relationTo: collectionSlug,
            value: {
                id: docID
            }
        });
        closeDrawer();
    }, [
        editor,
        closeDrawer
    ]);
    useEffect(()=>{
        // always reset back to first option
        // TODO: this is not working, see the ListDrawer component
        setSelectedCollectionSlug(enabledCollectionSlugs[0]);
    }, [
        isDrawerOpen,
        enabledCollectionSlugs
    ]);
    return /*#__PURE__*/ _jsxs(Fragment, {
        children: [
            /*#__PURE__*/ _jsx(ListDrawerToggler, {
                children: /*#__PURE__*/ _jsx(ElementButton, {
                    className: baseClass,
                    el: "div",
                    format: "relationship",
                    onClick: ()=>{
                    // do nothing
                    },
                    tooltip: t('fields:addRelationship'),
                    children: /*#__PURE__*/ _jsx(RelationshipIcon, {})
                })
            }),
            /*#__PURE__*/ _jsx(ListDrawer, {
                onSelect: onSelect
            })
        ]
    });
};
export const Button = (props)=>{
    return /*#__PURE__*/ _jsx(EnabledRelationshipsCondition, {
        ...props,
        children: /*#__PURE__*/ _jsx(RelationshipButton, {
            ...props
        })
    });
};

//# sourceMappingURL=index.js.map