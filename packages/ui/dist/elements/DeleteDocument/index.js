'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Modal, useModal } from '@faceless-ui/modal';
import { getTranslation } from '@payloadcms/translations';
import { useRouter } from 'next/navigation.js';
import React, { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { useForm } from '../../forms/Form/context.js';
import { useConfig } from '../../providers/Config/index.js';
import { useDocumentInfo } from '../../providers/DocumentInfo/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { requests } from '../../utilities/api.js';
import { Button } from '../Button/index.js';
import { PopupList } from '../Popup/index.js';
import { Translation } from '../Translation/index.js';
import './index.scss';
const baseClass = 'delete-document';
export const DeleteDocument = (props)=>{
    const { id, buttonId, collectionSlug, singularLabel, title: titleFromProps } = props;
    const { routes: { admin, api }, serverURL } = useConfig();
    const { setModified } = useForm();
    const [deleting, setDeleting] = useState(false);
    const { toggleModal } = useModal();
    const router = useRouter();
    const { i18n, t } = useTranslation();
    const { title } = useDocumentInfo();
    const titleToRender = titleFromProps || title || id;
    const modalSlug = `delete-${id}`;
    const addDefaultError = useCallback(()=>{
        setDeleting(false);
        toast.error(t('error:deletingTitle', {
            title
        }));
    }, [
        t,
        title
    ]);
    const handleDelete = useCallback(async ()=>{
        setDeleting(true);
        setModified(false);
        try {
            await requests.delete(`${serverURL}${api}/${collectionSlug}/${id}`, {
                headers: {
                    'Accept-Language': i18n.language,
                    'Content-Type': 'application/json'
                }
            }).then(async (res)=>{
                try {
                    const json = await res.json();
                    if (res.status < 400) {
                        setDeleting(false);
                        toggleModal(modalSlug);
                        toast.success(t('general:titleDeleted', {
                            label: getTranslation(singularLabel, i18n),
                            title
                        }) || json.message);
                        return router.push(`${admin}/collections/${collectionSlug}`);
                    }
                    toggleModal(modalSlug);
                    if (json.errors) {
                        json.errors.forEach((error)=>toast.error(error.message));
                    } else {
                        addDefaultError();
                    }
                    return false;
                } catch (e) {
                    return addDefaultError();
                }
            });
        } catch (e) {
            addDefaultError();
        }
    }, [
        setModified,
        serverURL,
        api,
        collectionSlug,
        id,
        toggleModal,
        modalSlug,
        t,
        singularLabel,
        i18n,
        title,
        router,
        admin,
        addDefaultError
    ]);
    if (id) {
        return /*#__PURE__*/ _jsxs(React.Fragment, {
            children: [
                /*#__PURE__*/ _jsx(PopupList.Button, {
                    id: buttonId,
                    onClick: ()=>{
                        setDeleting(false);
                        toggleModal(modalSlug);
                    },
                    children: t('general:delete')
                }),
                /*#__PURE__*/ _jsx(Modal, {
                    className: baseClass,
                    slug: modalSlug,
                    children: /*#__PURE__*/ _jsxs("div", {
                        className: `${baseClass}__template`,
                        children: [
                            /*#__PURE__*/ _jsx("h1", {
                                children: t('general:confirmDeletion')
                            }),
                            /*#__PURE__*/ _jsx("p", {
                                children: /*#__PURE__*/ _jsx(Translation, {
                                    elements: {
                                        '1': ({ children })=>/*#__PURE__*/ _jsx("strong", {
                                                children: children
                                            })
                                    },
                                    i18nKey: "general:aboutToDelete",
                                    t: t,
                                    variables: {
                                        label: getTranslation(singularLabel, i18n),
                                        title: titleToRender
                                    }
                                })
                            }),
                            /*#__PURE__*/ _jsxs("div", {
                                className: `${baseClass}__actions`,
                                children: [
                                    /*#__PURE__*/ _jsx(Button, {
                                        buttonStyle: "secondary",
                                        id: "confirm-cancel",
                                        onClick: deleting ? undefined : ()=>toggleModal(modalSlug),
                                        type: "button",
                                        children: t('general:cancel')
                                    }),
                                    /*#__PURE__*/ _jsx(Button, {
                                        id: "confirm-delete",
                                        onClick: deleting ? undefined : handleDelete,
                                        children: deleting ? t('general:deleting') : t('general:confirm')
                                    })
                                ]
                            })
                        ]
                    })
                })
            ]
        });
    }
    return null;
};

//# sourceMappingURL=index.js.map