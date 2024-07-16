'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Button } from '../../../elements/Button/index.js';
import { useDocumentDrawer } from '../../../elements/DocumentDrawer/index.js';
import * as PopupList from '../../../elements/Popup/PopupButtonList/index.js';
import { Popup } from '../../../elements/Popup/index.js';
import { Tooltip } from '../../../elements/Tooltip/index.js';
import { PlusIcon } from '../../../icons/Plus/index.js';
import { useAuth } from '../../../providers/Auth/index.js';
import { useTranslation } from '../../../providers/Translation/index.js';
import './index.scss';
import { useRelatedCollections } from './useRelatedCollections.js';
const baseClass = 'relationship-add-new';
export const AddNewRelation = ({ // dispatchOptions,
hasMany, path, relationTo, setValue, value })=>{
    const relatedCollections = useRelatedCollections(relationTo);
    const { permissions } = useAuth();
    const [show, setShow] = useState(false);
    const [selectedCollection, setSelectedCollection] = useState();
    const relatedToMany = relatedCollections.length > 1;
    const [collectionConfig, setCollectionConfig] = useState(()=>!relatedToMany ? relatedCollections[0] : undefined);
    const [popupOpen, setPopupOpen] = useState(false);
    const { i18n, t } = useTranslation();
    const [showTooltip, setShowTooltip] = useState(false);
    const [DocumentDrawer, DocumentDrawerToggler, { isDrawerOpen, toggleDrawer }] = useDocumentDrawer({
        collectionSlug: collectionConfig?.slug
    });
    const onSave = useCallback(({ doc, operation })=>{
        if (operation === 'create') {
            const newValue = Array.isArray(relationTo) ? {
                relationTo: collectionConfig?.slug,
                value: doc.id
            } : doc.id;
            // ensure the value is not already in the array
            const isNewValue = Array.isArray(relationTo) && Array.isArray(value) ? !value.some((v)=>v && typeof v === 'object' && v.value === doc.id) : value !== doc.id;
            if (isNewValue) {
                // dispatchOptions({
                //   collection: collectionConfig,
                //   // TODO: fix this
                //   // @ts-expect-error-next-line
                //   type: 'ADD',
                //   config,
                //   docs: [doc],
                //   i18n,
                //   sort: true,
                // })
                if (hasMany) {
                    setValue([
                        ...Array.isArray(value) ? value : [],
                        newValue
                    ]);
                } else {
                    setValue(newValue);
                }
            }
            setSelectedCollection(undefined);
        }
    }, [
        relationTo,
        collectionConfig,
        hasMany,
        setValue,
        value
    ]);
    const onPopupToggle = useCallback((state)=>{
        setPopupOpen(state);
    }, []);
    useEffect(()=>{
        if (permissions) {
            if (relatedCollections.length === 1) {
                setShow(permissions.collections[relatedCollections[0]?.slug]?.create?.permission);
            } else {
                setShow(relatedCollections.some((collection)=>permissions.collections[collection?.slug]?.create?.permission));
            }
        }
    }, [
        permissions,
        relatedCollections
    ]);
    useEffect(()=>{
        if (relatedToMany && selectedCollection) {
            setCollectionConfig(relatedCollections.find((collection)=>collection?.slug === selectedCollection));
        }
    }, [
        selectedCollection,
        relatedToMany,
        relatedCollections
    ]);
    useEffect(()=>{
        if (relatedToMany && collectionConfig) {
            // the drawer must be rendered on the page before before opening it
            // this is why 'selectedCollection' is different from 'collectionConfig'
            toggleDrawer();
            setSelectedCollection(undefined);
        }
    }, [
        toggleDrawer,
        relatedToMany,
        collectionConfig
    ]);
    useEffect(()=>{
        if (relatedToMany && !isDrawerOpen) {
            setCollectionConfig(undefined);
        }
    }, [
        isDrawerOpen,
        relatedToMany
    ]);
    if (show) {
        return /*#__PURE__*/ _jsxs("div", {
            className: baseClass,
            id: `${path}-add-new`,
            children: [
                relatedCollections.length === 1 && /*#__PURE__*/ _jsxs(Fragment, {
                    children: [
                        /*#__PURE__*/ _jsxs(DocumentDrawerToggler, {
                            className: `${baseClass}__add-button`,
                            onClick: ()=>setShowTooltip(false),
                            onMouseEnter: ()=>setShowTooltip(true),
                            onMouseLeave: ()=>setShowTooltip(false),
                            children: [
                                /*#__PURE__*/ _jsx(Tooltip, {
                                    className: `${baseClass}__tooltip`,
                                    show: showTooltip,
                                    children: t('fields:addNewLabel', {
                                        label: getTranslation(relatedCollections[0].labels.singular, i18n)
                                    })
                                }),
                                /*#__PURE__*/ _jsx(PlusIcon, {})
                            ]
                        }),
                        /*#__PURE__*/ _jsx(DocumentDrawer, {
                            onSave: onSave
                        })
                    ]
                }),
                relatedCollections.length > 1 && /*#__PURE__*/ _jsxs(Fragment, {
                    children: [
                        /*#__PURE__*/ _jsx(Popup, {
                            button: /*#__PURE__*/ _jsx(Button, {
                                buttonStyle: "none",
                                className: `${baseClass}__add-button`,
                                tooltip: popupOpen ? undefined : t('fields:addNew'),
                                children: /*#__PURE__*/ _jsx(PlusIcon, {})
                            }),
                            buttonType: "custom",
                            horizontalAlign: "center",
                            onToggleOpen: onPopupToggle,
                            render: ({ close: closePopup })=>/*#__PURE__*/ _jsx(PopupList.ButtonGroup, {
                                    children: relatedCollections.map((relatedCollection)=>{
                                        if (permissions.collections[relatedCollection?.slug].create.permission) {
                                            return /*#__PURE__*/ _jsx(PopupList.Button, {
                                                className: `${baseClass}__relation-button--${relatedCollection?.slug}`,
                                                onClick: ()=>{
                                                    closePopup();
                                                    setSelectedCollection(relatedCollection?.slug);
                                                },
                                                children: getTranslation(relatedCollection?.labels?.singular, i18n)
                                            }, relatedCollection?.slug);
                                        }
                                        return null;
                                    })
                                }),
                            size: "medium"
                        }),
                        collectionConfig && permissions.collections[collectionConfig?.slug]?.create?.permission && /*#__PURE__*/ _jsx(DocumentDrawer, {
                            onSave: onSave
                        })
                    ]
                })
            ]
        });
    }
    return null;
};

//# sourceMappingURL=index.js.map