'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createElement as _createElement } from "react";
import { useModal } from '@faceless-ui/modal';
import React, { useCallback, useEffect, useId, useMemo, useState } from 'react';
export * from './types.js';
import { useConfig } from '../../providers/Config/index.js';
import { useEditDepth } from '../../providers/EditDepth/index.js';
import { Drawer, DrawerToggler } from '../Drawer/index.js';
import { ListDrawerContent } from './DrawerContent.js';
import './index.scss';
export const baseClass = 'list-drawer';
export const formatListDrawerSlug = ({ depth, uuid })=>`list-drawer_${depth}_${uuid}`;
export const ListDrawerToggler = ({ children, className, disabled, drawerSlug, ...rest })=>{
    return /*#__PURE__*/ _jsx(DrawerToggler, {
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
export const ListDrawer = (props)=>{
    const { drawerSlug } = props;
    return /*#__PURE__*/ _jsx(Drawer, {
        Header: null,
        className: baseClass,
        gutter: false,
        slug: drawerSlug,
        children: /*#__PURE__*/ _jsx(ListDrawerContent, {
            ...props
        })
    });
};
export const useListDrawer = ({ collectionSlugs: collectionSlugsFromProps, filterOptions, selectedCollection, uploads })=>{
    const { collections } = useConfig();
    const drawerDepth = useEditDepth();
    const uuid = useId();
    const { closeModal, modalState, openModal, toggleModal } = useModal();
    const [isOpen, setIsOpen] = useState(false);
    const [collectionSlugs, setCollectionSlugs] = useState(collectionSlugsFromProps);
    const drawerSlug = formatListDrawerSlug({
        depth: drawerDepth,
        uuid
    });
    useEffect(()=>{
        setIsOpen(Boolean(modalState[drawerSlug]?.isOpen));
    }, [
        modalState,
        drawerSlug
    ]);
    useEffect(()=>{
        if (!collectionSlugs || collectionSlugs.length === 0) {
            const filteredCollectionSlugs = collections.filter(({ upload })=>{
                if (uploads) {
                    return Boolean(upload) === true;
                }
                return true;
            });
            setCollectionSlugs(filteredCollectionSlugs.map(({ slug })=>slug));
        }
    }, [
        collectionSlugs,
        uploads,
        collections
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
        drawerSlug,
        closeModal
    ]);
    const openDrawer = useCallback(()=>{
        openModal(drawerSlug);
    }, [
        drawerSlug,
        openModal
    ]);
    const MemoizedDrawer = useMemo(()=>{
        return (props)=>/*#__PURE__*/ _createElement(ListDrawer, {
                ...props,
                closeDrawer: closeDrawer,
                collectionSlugs: collectionSlugs,
                drawerSlug: drawerSlug,
                filterOptions: filterOptions,
                key: drawerSlug,
                selectedCollection: selectedCollection,
                uploads: uploads
            });
    }, [
        drawerSlug,
        collectionSlugs,
        uploads,
        closeDrawer,
        selectedCollection,
        filterOptions
    ]);
    const MemoizedDrawerToggler = useMemo(()=>{
        return (props)=>/*#__PURE__*/ _jsx(ListDrawerToggler, {
                ...props,
                drawerSlug: drawerSlug
            });
    }, [
        drawerSlug
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