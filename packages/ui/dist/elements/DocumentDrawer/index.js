'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import { useModal } from '@faceless-ui/modal';
import { getTranslation } from '@payloadcms/translations';
import React, { useCallback, useEffect, useId, useMemo, useState } from 'react';
import { useRelatedCollections } from '../../fields/Relationship/AddNew/useRelatedCollections.js';
import { useEditDepth } from '../../providers/EditDepth/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { Drawer, DrawerToggler } from '../Drawer/index.js';
import { DocumentDrawerContent } from './DrawerContent.js';
import './index.scss';
export const baseClass = 'doc-drawer';
const formatDocumentDrawerSlug = ({ id, collectionSlug, depth, uuid })=>`doc-drawer_${collectionSlug}_${depth}${id ? `_${id}` : ''}_${uuid}`;
export const DocumentDrawerToggler = ({ id, children, className, collectionSlug, disabled, drawerSlug, ...rest })=>{
    const { i18n, t } = useTranslation();
    const [collectionConfig] = useRelatedCollections(collectionSlug);
    return /*#__PURE__*/ _jsx(DrawerToggler, {
        "aria-label": t(!id ? 'fields:addNewLabel' : 'general:editLabel', {
            label: getTranslation(collectionConfig.labels.singular, i18n)
        }),
        className: [
            className,
            `${baseClass}__toggler`
        ].filter(Boolean).join(' '),
        disabled: disabled,
        slug: drawerSlug,
        ...rest,
        children: children
    });
};
export const DocumentDrawer = (props)=>{
    const { drawerSlug } = props;
    return /*#__PURE__*/ _jsx(Drawer, {
        Header: null,
        className: baseClass,
        gutter: false,
        slug: drawerSlug,
        children: /*#__PURE__*/ _jsx(DocumentDrawerContent, {
            ...props
        })
    });
};
export const useDocumentDrawer = ({ id, collectionSlug })=>{
    const drawerDepth = useEditDepth();
    const uuid = useId();
    const { closeModal, modalState, openModal, toggleModal } = useModal();
    const [isOpen, setIsOpen] = useState(false);
    const drawerSlug = formatDocumentDrawerSlug({
        id,
        collectionSlug,
        depth: drawerDepth,
        uuid
    });
    useEffect(()=>{
        setIsOpen(Boolean(modalState[drawerSlug]?.isOpen));
    }, [
        modalState,
        drawerSlug
    ]);
    const toggleDrawer = useCallback(()=>{
        toggleModal(drawerSlug);
    }, [
        toggleModal,
        drawerSlug
    ]);
    const closeDrawer = useCallback(()=>{
        closeModal(drawerSlug);
    }, [
        closeModal,
        drawerSlug
    ]);
    const openDrawer = useCallback(()=>{
        openModal(drawerSlug);
    }, [
        openModal,
        drawerSlug
    ]);
    const MemoizedDrawer = useMemo(()=>{
        return (props)=>/*#__PURE__*/ _createElement(DocumentDrawer, {
                ...props,
                collectionSlug: collectionSlug,
                drawerSlug: drawerSlug,
                id: id,
                key: drawerSlug
            });
    }, [
        id,
        drawerSlug,
        collectionSlug
    ]);
    const MemoizedDrawerToggler = useMemo(()=>{
        return (props)=>/*#__PURE__*/ _jsx(DocumentDrawerToggler, {
                ...props,
                collectionSlug: collectionSlug,
                drawerSlug: drawerSlug,
                id: id
            });
    }, [
        id,
        drawerSlug,
        collectionSlug
    ]);
    const MemoizedDrawerState = useMemo(()=>({
            closeDrawer,
            drawerDepth,
            drawerSlug,
            isDrawerOpen: isOpen,
            openDrawer,
            toggleDrawer
        }), [
        drawerDepth,
        drawerSlug,
        isOpen,
        toggleDrawer,
        closeDrawer,
        openDrawer
    ]);
    return [
        MemoizedDrawer,
        MemoizedDrawerToggler,
        MemoizedDrawerState
    ];
};

//# sourceMappingURL=index.js.map