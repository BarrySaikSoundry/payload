'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { Fragment, useEffect, useState } from 'react';
import { components } from 'react-select';
import { useDocumentDrawer } from '../../../../elements/DocumentDrawer/index.js';
import { Tooltip } from '../../../../elements/Tooltip/index.js';
import { EditIcon } from '../../../../icons/Edit/index.js';
import { useAuth } from '../../../../providers/Auth/index.js';
import { useTranslation } from '../../../../providers/Translation/index.js';
import './index.scss';
const baseClass = 'relationship--multi-value-label';
export const MultiValueLabel = (props)=>{
    const { data: { label, relationTo, value }, selectProps: { // @ts-expect-error-next-line // TODO Fix this - moduleResolution 16 breaks our declare module
    customProps: { // @ts-expect-error-next-line// TODO Fix this - moduleResolution 16 breaks our declare module
    draggableProps, // @ts-expect-error-next-line // TODO Fix this - moduleResolution 16 breaks our declare module
    setDrawerIsOpen } = {} } = {} } = props;
    const { permissions } = useAuth();
    const [showTooltip, setShowTooltip] = useState(false);
    const { t } = useTranslation();
    const hasReadPermission = Boolean(permissions?.collections?.[relationTo]?.read?.permission);
    const [DocumentDrawer, DocumentDrawerToggler, { isDrawerOpen }] = useDocumentDrawer({
        id: value?.toString(),
        collectionSlug: relationTo
    });
    useEffect(()=>{
        if (typeof setDrawerIsOpen === 'function') setDrawerIsOpen(isDrawerOpen);
    }, [
        isDrawerOpen,
        setDrawerIsOpen
    ]);
    return /*#__PURE__*/ _jsxs("div", {
        className: baseClass,
        children: [
            /*#__PURE__*/ _jsx("div", {
                className: `${baseClass}__content`,
                children: /*#__PURE__*/ _jsx(components.MultiValueLabel, {
                    ...props,
                    innerProps: {
                        className: `${baseClass}__text`,
                        ...draggableProps || {}
                    }
                })
            }),
            relationTo && hasReadPermission && /*#__PURE__*/ _jsxs(Fragment, {
                children: [
                    /*#__PURE__*/ _jsxs(DocumentDrawerToggler, {
                        "aria-label": `Edit ${label}`,
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
                                children: t('general:editLabel', {
                                    label: ''
                                })
                            }),
                            /*#__PURE__*/ _jsx(EditIcon, {
                                className: `${baseClass}__icon`
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsx(DocumentDrawer, {
                        onSave: null
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=index.js.map