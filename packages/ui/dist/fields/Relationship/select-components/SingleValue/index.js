'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { Fragment, useEffect, useState } from 'react';
import { components as SelectComponents } from 'react-select';
import { useDocumentDrawer } from '../../../../elements/DocumentDrawer/index.js';
import { Tooltip } from '../../../../elements/Tooltip/index.js';
import { EditIcon } from '../../../../icons/Edit/index.js';
import { useAuth } from '../../../../providers/Auth/index.js';
import { useTranslation } from '../../../../providers/Translation/index.js';
import './index.scss';
const baseClass = 'relationship--single-value';
export const SingleValue = (props)=>{
    const { children, data: { label, relationTo, value }, // @ts-expect-error-next-line // TODO Fix this - moduleResolution 16 breaks our declare module
    selectProps: { customProps: { onSave, setDrawerIsOpen } = {} } = {} } = props;
    const [showTooltip, setShowTooltip] = useState(false);
    const { t } = useTranslation();
    const { permissions } = useAuth();
    const hasReadPermission = Boolean(permissions?.collections?.[relationTo]?.read?.permission);
    const [DocumentDrawer, DocumentDrawerToggler, { isDrawerOpen }] = useDocumentDrawer({
        id: value.toString(),
        collectionSlug: relationTo
    });
    useEffect(()=>{
        if (typeof setDrawerIsOpen === 'function') {
            setDrawerIsOpen(isDrawerOpen);
        }
    }, [
        isDrawerOpen,
        setDrawerIsOpen
    ]);
    return /*#__PURE__*/ _jsx(React.Fragment, {
        children: /*#__PURE__*/ _jsxs(SelectComponents.SingleValue, {
            ...props,
            className: baseClass,
            children: [
                /*#__PURE__*/ _jsx("div", {
                    className: `${baseClass}__label`,
                    children: /*#__PURE__*/ _jsxs("div", {
                        className: `${baseClass}__label-text`,
                        children: [
                            /*#__PURE__*/ _jsx("div", {
                                className: `${baseClass}__text`,
                                children: children
                            }),
                            relationTo && hasReadPermission && /*#__PURE__*/ _jsx(Fragment, {
                                children: /*#__PURE__*/ _jsxs(DocumentDrawerToggler, {
                                    "aria-label": t('general:editLabel', {
                                        label
                                    }),
                                    className: `${baseClass}__drawer-toggler`,
                                    onClick: ()=>setShowTooltip(false),
                                    onKeyDown: (e)=>{
                                        if (e.key === 'Enter') {
                                            e.stopPropagation();
                                        }
                                    },
                                    onMouseDown: (e)=>e.stopPropagation(),
                                    onMouseEnter: ()=>setShowTooltip(true),
                                    onMouseLeave: ()=>setShowTooltip(false),
                                    onTouchEnd: (e)=>e.stopPropagation(),
                                    children: [
                                        /*#__PURE__*/ _jsx(Tooltip, {
                                            className: `${baseClass}__tooltip`,
                                            show: showTooltip,
                                            children: t('general:edit')
                                        }),
                                        /*#__PURE__*/ _jsx(EditIcon, {})
                                    ]
                                })
                            })
                        ]
                    })
                }),
                relationTo && hasReadPermission && /*#__PURE__*/ _jsx(DocumentDrawer, {
                    onSave: onSave
                })
            ]
        })
    });
};

//# sourceMappingURL=index.js.map