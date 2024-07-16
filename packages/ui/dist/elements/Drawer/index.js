'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Modal, useModal } from '@faceless-ui/modal';
import React, { useCallback, useEffect, useState } from 'react';
import { XIcon } from '../../icons/X/index.js';
import { EditDepthContext, useEditDepth } from '../../providers/EditDepth/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { Gutter } from '../Gutter/index.js';
import './index.scss';
const baseClass = 'drawer';
const zBase = 100;
export const formatDrawerSlug = ({ slug, depth })=>`drawer_${depth}_${slug}`;
export { useDrawerSlug } from './useDrawerSlug.js';
export const DrawerToggler = ({ slug, children, className, disabled, onClick, ...rest })=>{
    const { openModal } = useModal();
    const handleClick = useCallback((e)=>{
        openModal(slug);
        if (typeof onClick === 'function') onClick(e);
    }, [
        openModal,
        slug,
        onClick
    ]);
    return /*#__PURE__*/ _jsx("button", {
        className: className,
        disabled: disabled,
        onClick: handleClick,
        type: "button",
        ...rest,
        children: children
    });
};
export const Drawer = ({ slug, Header, children, className, gutter = true, hoverTitle, title })=>{
    const { t } = useTranslation();
    const { closeModal, modalState } = useModal();
    const drawerDepth = useEditDepth();
    const [isOpen, setIsOpen] = useState(false);
    const [animateIn, setAnimateIn] = useState(false);
    useEffect(()=>{
        setIsOpen(modalState[slug]?.isOpen);
    }, [
        slug,
        modalState
    ]);
    useEffect(()=>{
        setAnimateIn(isOpen);
    }, [
        isOpen
    ]);
    if (isOpen) {
        // IMPORTANT: do not render the drawer until it is explicitly open, this is to avoid large html trees especially when nesting drawers
        return /*#__PURE__*/ _jsxs(Modal, {
            className: [
                className,
                baseClass,
                animateIn && `${baseClass}--is-open`,
                drawerDepth > 1 && `${baseClass}--nested`
            ].filter(Boolean).join(' '),
            slug: slug,
            style: {
                zIndex: zBase + drawerDepth
            },
            children: [
                (!drawerDepth || drawerDepth === 1) && /*#__PURE__*/ _jsx("div", {
                    className: `${baseClass}__blur-bg`
                }),
                /*#__PURE__*/ _jsx("button", {
                    "aria-label": t('general:close'),
                    className: `${baseClass}__close`,
                    id: `close-drawer__${slug}`,
                    onClick: ()=>closeModal(slug),
                    type: "button"
                }),
                /*#__PURE__*/ _jsxs("div", {
                    className: `${baseClass}__content`,
                    children: [
                        /*#__PURE__*/ _jsx("div", {
                            className: `${baseClass}__blur-bg-content`
                        }),
                        /*#__PURE__*/ _jsx(Gutter, {
                            className: `${baseClass}__content-children`,
                            left: gutter,
                            right: gutter,
                            children: /*#__PURE__*/ _jsxs(EditDepthContext.Provider, {
                                value: drawerDepth + 1,
                                children: [
                                    Header,
                                    Header === undefined && /*#__PURE__*/ _jsxs("div", {
                                        className: `${baseClass}__header`,
                                        children: [
                                            /*#__PURE__*/ _jsx("h2", {
                                                className: `${baseClass}__header__title`,
                                                title: hoverTitle ? title : null,
                                                children: title
                                            }),
                                            /*#__PURE__*/ _jsx("button", {
                                                "aria-label": t('general:close'),
                                                className: `${baseClass}__header__close`,
                                                id: `close-drawer__${slug}`,
                                                onClick: ()=>closeModal(slug),
                                                type: "button",
                                                children: /*#__PURE__*/ _jsx(XIcon, {})
                                            })
                                        ]
                                    }),
                                    children
                                ]
                            })
                        })
                    ]
                })
            ]
        });
    }
    return null;
};

//# sourceMappingURL=index.js.map