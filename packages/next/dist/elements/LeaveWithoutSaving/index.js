'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Modal, useAuth, useFormModified, useModal, useTranslation } from '@payloadcms/ui';
import React, { useCallback, useEffect } from 'react';
import { usePreventLeave } from './usePreventLeave.js';
const modalSlug = 'leave-without-saving';
const baseClass = 'leave-without-saving';
const Component = ({ isActive, onCancel, onConfirm })=>{
    const { closeModal, modalState, openModal } = useModal();
    const { t } = useTranslation();
    // Manually check for modal state as 'esc' key will not trigger the nav inactivity
    // useEffect(() => {
    //   if (!modalState?.[modalSlug]?.isOpen && isActive) {
    //     onCancel()
    //   }
    // }, [modalState, isActive, onCancel])
    useEffect(()=>{
        if (isActive) openModal(modalSlug);
        else closeModal(modalSlug);
    }, [
        isActive,
        openModal,
        closeModal
    ]);
    return /*#__PURE__*/ _jsx(Modal, {
        className: baseClass,
        onClose: onCancel,
        slug: modalSlug,
        children: /*#__PURE__*/ _jsxs("div", {
            className: `${baseClass}__wrapper`,
            children: [
                /*#__PURE__*/ _jsxs("div", {
                    className: `${baseClass}__content`,
                    children: [
                        /*#__PURE__*/ _jsx("h1", {
                            children: t('general:leaveWithoutSaving')
                        }),
                        /*#__PURE__*/ _jsx("p", {
                            children: t('general:changesNotSaved')
                        })
                    ]
                }),
                /*#__PURE__*/ _jsxs("div", {
                    className: `${baseClass}__controls`,
                    children: [
                        /*#__PURE__*/ _jsx(Button, {
                            buttonStyle: "secondary",
                            onClick: onCancel,
                            children: t('general:stayOnThisPage')
                        }),
                        /*#__PURE__*/ _jsx(Button, {
                            onClick: onConfirm,
                            children: t('general:leaveAnyway')
                        })
                    ]
                })
            ]
        })
    });
};
export const LeaveWithoutSaving = ()=>{
    const modified = useFormModified();
    const { user } = useAuth();
    const [show, setShow] = React.useState(false);
    const [hasAccepted, setHasAccepted] = React.useState(false);
    const prevent = Boolean(modified && user);
    const onPrevent = useCallback(()=>{
        setShow(true);
    }, []);
    usePreventLeave({
        hasAccepted,
        onPrevent,
        prevent
    });
    return /*#__PURE__*/ _jsx(Component, {
        isActive: show,
        onCancel: ()=>{
            setShow(false);
        },
        onConfirm: ()=>{
            setHasAccepted(true);
        }
    });
};

//# sourceMappingURL=index.js.map