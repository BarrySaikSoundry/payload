'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Modal, useModal } from '@faceless-ui/modal';
import React, { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { useForm } from '../../forms/Form/context.js';
import { useConfig } from '../../providers/Config/index.js';
import { useDocumentInfo } from '../../providers/DocumentInfo/index.js';
import { useLocale } from '../../providers/Locale/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { requests } from '../../utilities/api.js';
import { Button } from '../Button/index.js';
import './index.scss';
const baseClass = 'status';
export const Status = ()=>{
    const { id, collectionSlug, docPermissions, getVersions, globalSlug, publishedDoc, unpublishedVersions } = useDocumentInfo();
    const { toggleModal } = useModal();
    const { routes: { api }, serverURL } = useConfig();
    const [processing, setProcessing] = useState(false);
    const { reset: resetForm } = useForm();
    const { code: locale } = useLocale();
    const { i18n, t } = useTranslation();
    const unPublishModalSlug = `confirm-un-publish-${id}`;
    const revertModalSlug = `confirm-revert-${id}`;
    let statusToRender;
    if (unpublishedVersions?.docs?.length > 0 && publishedDoc) {
        statusToRender = 'changed';
    } else if (!publishedDoc) {
        statusToRender = 'draft';
    } else if (publishedDoc && unpublishedVersions?.docs?.length <= 1) {
        statusToRender = 'published';
    }
    const performAction = useCallback(async (action)=>{
        let url;
        let method;
        let body;
        setProcessing(true);
        if (action === 'unpublish') {
            body = {
                _status: 'draft'
            };
        }
        if (action === 'revert') {
            body = publishedDoc;
        }
        if (collectionSlug) {
            url = `${serverURL}${api}/${collectionSlug}/${id}?locale=${locale}&fallback-locale=null`;
            method = 'patch';
        }
        if (globalSlug) {
            url = `${serverURL}${api}/globals/${globalSlug}?locale=${locale}&fallback-locale=null`;
            method = 'post';
        }
        const res = await requests[method](url, {
            body: JSON.stringify(body),
            headers: {
                'Accept-Language': i18n.language,
                'Content-Type': 'application/json'
            }
        });
        if (res.status === 200) {
            let data;
            const json = await res.json();
            if (globalSlug) {
                data = json.result;
            } else if (collectionSlug) {
                data = json.doc;
            }
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            resetForm(data);
            toast.success(json.message);
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            getVersions();
        } else {
            toast.error(t('error:unPublishingDocument'));
        }
        setProcessing(false);
        if (action === 'revert') {
            toggleModal(revertModalSlug);
        }
        if (action === 'unpublish') {
            toggleModal(unPublishModalSlug);
        }
    }, [
        api,
        collectionSlug,
        getVersions,
        globalSlug,
        i18n.language,
        id,
        locale,
        publishedDoc,
        resetForm,
        revertModalSlug,
        serverURL,
        t,
        toggleModal,
        unPublishModalSlug
    ]);
    const canUpdate = docPermissions?.update?.permission;
    if (statusToRender) {
        return /*#__PURE__*/ _jsx("div", {
            className: baseClass,
            title: `${t('version:status')}: ${t(`version:${statusToRender}`)}`,
            children: /*#__PURE__*/ _jsxs("div", {
                className: `${baseClass}__value-wrap`,
                children: [
                    /*#__PURE__*/ _jsxs("span", {
                        className: `${baseClass}__label`,
                        children: [
                            t('version:status'),
                            ": "
                        ]
                    }),
                    /*#__PURE__*/ _jsx("span", {
                        className: `${baseClass}__value`,
                        children: t(`version:${statusToRender}`)
                    }),
                    canUpdate && statusToRender === 'published' && /*#__PURE__*/ _jsxs(React.Fragment, {
                        children: [
                            " — ",
                            /*#__PURE__*/ _jsx(Button, {
                                buttonStyle: "none",
                                className: `${baseClass}__action`,
                                onClick: ()=>toggleModal(unPublishModalSlug),
                                children: t('version:unpublish')
                            }),
                            /*#__PURE__*/ _jsx(Modal, {
                                className: `${baseClass}__modal`,
                                slug: unPublishModalSlug,
                                children: /*#__PURE__*/ _jsxs("div", {
                                    className: `${baseClass}__modal-template`,
                                    children: [
                                        /*#__PURE__*/ _jsx("h1", {
                                            children: t('version:confirmUnpublish')
                                        }),
                                        /*#__PURE__*/ _jsx("p", {
                                            children: t('version:aboutToUnpublish')
                                        }),
                                        /*#__PURE__*/ _jsx(Button, {
                                            buttonStyle: "secondary",
                                            onClick: processing ? undefined : ()=>toggleModal(unPublishModalSlug),
                                            type: "button",
                                            children: t('general:cancel')
                                        }),
                                        /*#__PURE__*/ _jsx(Button, {
                                            onClick: processing ? undefined : ()=>performAction('unpublish'),
                                            children: t(processing ? 'version:unpublishing' : 'general:confirm')
                                        })
                                    ]
                                })
                            })
                        ]
                    }),
                    canUpdate && statusToRender === 'changed' && /*#__PURE__*/ _jsxs(React.Fragment, {
                        children: [
                            " — ",
                            /*#__PURE__*/ _jsx(Button, {
                                buttonStyle: "none",
                                className: `${baseClass}__action`,
                                id: "action-revert-to-published",
                                onClick: ()=>toggleModal(revertModalSlug),
                                children: t('version:revertToPublished')
                            }),
                            /*#__PURE__*/ _jsx(Modal, {
                                className: `${baseClass}__modal`,
                                slug: revertModalSlug,
                                children: /*#__PURE__*/ _jsxs("div", {
                                    className: `${baseClass}__modal-template`,
                                    children: [
                                        /*#__PURE__*/ _jsx("h1", {
                                            children: t('version:confirmRevertToSaved')
                                        }),
                                        /*#__PURE__*/ _jsx("p", {
                                            children: t('version:aboutToRevertToPublished')
                                        }),
                                        /*#__PURE__*/ _jsx(Button, {
                                            buttonStyle: "secondary",
                                            onClick: processing ? undefined : ()=>toggleModal(revertModalSlug),
                                            type: "button",
                                            children: t('general:cancel')
                                        }),
                                        /*#__PURE__*/ _jsx(Button, {
                                            id: "action-revert-to-published-confirm",
                                            onClick: processing ? undefined : ()=>performAction('revert'),
                                            children: t(processing ? 'version:reverting' : 'general:confirm')
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                ]
            })
        });
    }
    return null;
};

//# sourceMappingURL=index.js.map