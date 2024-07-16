'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import { Button, Modal, Pill, useConfig, useModal, useTranslation } from '@payloadcms/ui';
import { requests } from '@payloadcms/ui/shared';
import { useRouter } from 'next/navigation.js';
import React, { Fragment, useCallback, useState } from 'react';
import { toast } from 'sonner';
import { MinimalTemplate } from '../../../templates/Minimal/index.js';
const baseClass = 'restore-version';
const modalSlug = 'restore-version';
const Restore = ({ className, collectionSlug, globalSlug, label, originalDocID, versionDate, versionID })=>{
    const { routes: { admin, api }, serverURL } = useConfig();
    const { toggleModal } = useModal();
    const [processing, setProcessing] = useState(false);
    const router = useRouter();
    const { i18n, t } = useTranslation();
    const restoreMessage = t('version:aboutToRestoreGlobal', {
        label: getTranslation(label, i18n),
        versionDate
    });
    let fetchURL = `${serverURL}${api}`;
    let redirectURL;
    if (collectionSlug) {
        fetchURL = `${fetchURL}/${collectionSlug}/versions/${versionID}`;
        redirectURL = `${admin}/collections/${collectionSlug}/${originalDocID}`;
    }
    if (globalSlug) {
        fetchURL = `${fetchURL}/globals/${globalSlug}/versions/${versionID}`;
        redirectURL = `${admin}/globals/${globalSlug}`;
    }
    const handleRestore = useCallback(async ()=>{
        setProcessing(true);
        const res = await requests.post(fetchURL, {
            headers: {
                'Accept-Language': i18n.language
            }
        });
        if (res.status === 200) {
            const json = await res.json();
            toast.success(json.message);
            router.push(redirectURL);
        } else {
            toast.error(t('version:problemRestoringVersion'));
        }
    }, [
        fetchURL,
        redirectURL,
        t,
        i18n,
        router
    ]);
    return /*#__PURE__*/ _jsxs(Fragment, {
        children: [
            /*#__PURE__*/ _jsx(Pill, {
                className: [
                    baseClass,
                    className
                ].filter(Boolean).join(' '),
                onClick: ()=>toggleModal(modalSlug),
                children: t('version:restoreThisVersion')
            }),
            /*#__PURE__*/ _jsx(Modal, {
                className: `${baseClass}__modal`,
                slug: modalSlug,
                children: /*#__PURE__*/ _jsxs(MinimalTemplate, {
                    className: `${baseClass}__modal-template`,
                    children: [
                        /*#__PURE__*/ _jsx("h1", {
                            children: t('version:confirmVersionRestoration')
                        }),
                        /*#__PURE__*/ _jsx("p", {
                            children: restoreMessage
                        }),
                        /*#__PURE__*/ _jsx(Button, {
                            buttonStyle: "secondary",
                            onClick: processing ? undefined : ()=>toggleModal(modalSlug),
                            type: "button",
                            children: t('general:cancel')
                        }),
                        /*#__PURE__*/ _jsx(Button, {
                            onClick: processing ? undefined : handleRestore,
                            children: processing ? t('version:restoring') : t('general:confirm')
                        })
                    ]
                })
            })
        ]
    });
};
export default Restore;

//# sourceMappingURL=index.js.map