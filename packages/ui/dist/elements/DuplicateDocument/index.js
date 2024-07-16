'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Modal, useModal } from '@faceless-ui/modal';
import { getTranslation } from '@payloadcms/translations';
import { useRouter } from 'next/navigation.js';
import React, { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { useForm, useFormModified } from '../../forms/Form/context.js';
import { useConfig } from '../../providers/Config/index.js';
import { useLocale } from '../../providers/Locale/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { requests } from '../../utilities/api.js';
import { Button } from '../Button/index.js';
import { PopupList } from '../Popup/index.js';
import './index.scss';
const baseClass = 'duplicate';
export const DuplicateDocument = ({ id, slug, singularLabel })=>{
    const router = useRouter();
    const modified = useFormModified();
    const { toggleModal } = useModal();
    const locale = useLocale();
    const { setModified } = useForm();
    const { routes: { api }, serverURL } = useConfig();
    const { routes: { admin } } = useConfig();
    const [hasClicked, setHasClicked] = useState(false);
    const { i18n, t } = useTranslation();
    const modalSlug = `duplicate-${id}`;
    const handleClick = useCallback(async (override = false)=>{
        setHasClicked(true);
        if (modified && !override) {
            toggleModal(modalSlug);
            return;
        }
        await requests.post(`${serverURL}${api}/${slug}/${id}/duplicate${locale?.code ? `?locale=${locale.code}` : ''}`, {
            body: JSON.stringify({}),
            headers: {
                'Accept-Language': i18n.language,
                'Content-Type': 'application/json',
                credentials: 'include'
            }
        }).then(async (res)=>{
            const { doc, errors, message } = await res.json();
            if (res.status < 400) {
                toast.success(message || t('general:successfullyDuplicated', {
                    label: getTranslation(singularLabel, i18n)
                }));
                setModified(false);
                router.push(`${admin}/collections/${slug}/${doc.id}${locale?.code ? `?locale=${locale.code}` : ''}`);
            } else {
                toast.error(errors?.[0].message || message || t('error:unspecific', {
                    label: getTranslation(singularLabel, i18n)
                }));
            }
        });
    }, [
        locale,
        modified,
        serverURL,
        api,
        slug,
        id,
        i18n,
        toggleModal,
        modalSlug,
        t,
        singularLabel,
        setModified,
        router,
        admin
    ]);
    const confirm = useCallback(async ()=>{
        setHasClicked(false);
        await handleClick(true);
    }, [
        handleClick
    ]);
    return /*#__PURE__*/ _jsxs(React.Fragment, {
        children: [
            /*#__PURE__*/ _jsx(PopupList.Button, {
                id: "action-duplicate",
                onClick: ()=>handleClick(false),
                children: t('general:duplicate')
            }),
            modified && hasClicked && /*#__PURE__*/ _jsx(Modal, {
                className: `${baseClass}__modal`,
                slug: modalSlug,
                children: /*#__PURE__*/ _jsxs("div", {
                    className: `${baseClass}__modal-template`,
                    children: [
                        /*#__PURE__*/ _jsx("h1", {
                            children: t('general:confirmDuplication')
                        }),
                        /*#__PURE__*/ _jsx("p", {
                            children: t('general:unsavedChangesDuplicate')
                        }),
                        /*#__PURE__*/ _jsx(Button, {
                            buttonStyle: "secondary",
                            id: "confirm-cancel",
                            onClick: ()=>toggleModal(modalSlug),
                            type: "button",
                            children: t('general:cancel')
                        }),
                        /*#__PURE__*/ _jsx(Button, {
                            id: "confirm-duplicate",
                            onClick: confirm,
                            children: t('general:duplicateWithoutSaving')
                        })
                    ]
                })
            })
        ]
    });
};

//# sourceMappingURL=index.js.map