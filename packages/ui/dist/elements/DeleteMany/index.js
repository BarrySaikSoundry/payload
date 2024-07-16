'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Modal, useModal } from '@faceless-ui/modal';
import { getTranslation } from '@payloadcms/translations';
import { useRouter } from 'next/navigation.js';
import React, { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { useAuth } from '../../providers/Auth/index.js';
import { useConfig } from '../../providers/Config/index.js';
import { useRouteCache } from '../../providers/RouteCache/index.js';
import { useSearchParams } from '../../providers/SearchParams/index.js';
import { SelectAllStatus, useSelection } from '../../providers/Selection/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { requests } from '../../utilities/api.js';
import { Button } from '../Button/index.js';
import { Pill } from '../Pill/index.js';
import './index.scss';
const baseClass = 'delete-documents';
export const DeleteMany = (props)=>{
    const { collection: { slug, labels: { plural } } = {} } = props;
    const { permissions } = useAuth();
    const { routes: { api }, serverURL } = useConfig();
    const { toggleModal } = useModal();
    const { count, getQueryParams, selectAll, toggleAll } = useSelection();
    const { i18n, t } = useTranslation();
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();
    const { stringifyParams } = useSearchParams();
    const { clearRouteCache } = useRouteCache();
    const collectionPermissions = permissions?.collections?.[slug];
    const hasDeletePermission = collectionPermissions?.delete?.permission;
    const modalSlug = `delete-${slug}`;
    const addDefaultError = useCallback(()=>{
        toast.error(t('error:unknown'));
    }, [
        t
    ]);
    const handleDelete = useCallback(async ()=>{
        setDeleting(true);
        await requests.delete(`${serverURL}${api}/${slug}${getQueryParams()}`, {
            headers: {
                'Accept-Language': i18n.language,
                'Content-Type': 'application/json'
            }
        }).then(async (res)=>{
            try {
                const json = await res.json();
                toggleModal(modalSlug);
                if (res.status < 400) {
                    toast.success(json.message || t('general:deletedSuccessfully'));
                    toggleAll();
                    router.replace(stringifyParams({
                        params: {
                            page: selectAll ? '1' : undefined
                        },
                        replace: true
                    }));
                    clearRouteCache();
                    return null;
                }
                if (json.errors) {
                    toast.error(json.message);
                } else {
                    addDefaultError();
                }
                return false;
            } catch (e) {
                return addDefaultError();
            }
        });
    }, [
        addDefaultError,
        api,
        getQueryParams,
        i18n.language,
        modalSlug,
        router,
        selectAll,
        serverURL,
        slug,
        stringifyParams,
        t,
        toggleAll,
        toggleModal,
        clearRouteCache
    ]);
    if (selectAll === SelectAllStatus.None || !hasDeletePermission) {
        return null;
    }
    return /*#__PURE__*/ _jsxs(React.Fragment, {
        children: [
            /*#__PURE__*/ _jsx(Pill, {
                className: `${baseClass}__toggle`,
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
                            children: t('general:aboutToDeleteCount', {
                                count,
                                label: getTranslation(plural, i18n)
                            })
                        }),
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
            })
        ]
    });
};

//# sourceMappingURL=index.js.map