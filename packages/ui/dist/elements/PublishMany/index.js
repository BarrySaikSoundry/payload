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
const baseClass = 'publish-many';
export const PublishMany = (props)=>{
    const { clearRouteCache } = useRouteCache();
    const { collection: { slug, labels: { plural }, versions } = {} } = props;
    const { routes: { api }, serverURL } = useConfig();
    const { permissions } = useAuth();
    const { toggleModal } = useModal();
    const { i18n, t } = useTranslation();
    const { getQueryParams, selectAll } = useSelection();
    const [submitted, setSubmitted] = useState(false);
    const router = useRouter();
    const { stringifyParams } = useSearchParams();
    const collectionPermissions = permissions?.collections?.[slug];
    const hasPermission = collectionPermissions?.update?.permission;
    const modalSlug = `publish-${slug}`;
    const addDefaultError = useCallback(()=>{
        toast.error(t('error:unknown'));
    }, [
        t
    ]);
    const handlePublish = useCallback(async ()=>{
        setSubmitted(true);
        await requests.patch(`${serverURL}${api}/${slug}${getQueryParams({
            _status: {
                not_equals: 'published'
            }
        })}&draft=true`, {
            body: JSON.stringify({
                _status: 'published'
            }),
            headers: {
                'Accept-Language': i18n.language,
                'Content-Type': 'application/json'
            }
        }).then(async (res)=>{
            try {
                const json = await res.json();
                toggleModal(modalSlug);
                if (res.status < 400) {
                    toast.success(t('general:updatedSuccessfully'));
                    router.replace(stringifyParams({
                        params: {
                            page: selectAll ? '1' : undefined
                        }
                    }));
                    clearRouteCache();
                    return null;
                }
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
    }, [
        addDefaultError,
        api,
        getQueryParams,
        i18n.language,
        modalSlug,
        selectAll,
        serverURL,
        slug,
        t,
        toggleModal,
        router,
        stringifyParams,
        clearRouteCache
    ]);
    if (!versions?.drafts || selectAll === SelectAllStatus.None || !hasPermission) {
        return null;
    }
    return /*#__PURE__*/ _jsxs(React.Fragment, {
        children: [
            /*#__PURE__*/ _jsx(Pill, {
                className: `${baseClass}__toggle`,
                onClick: ()=>{
                    setSubmitted(false);
                    toggleModal(modalSlug);
                },
                children: t('version:publish')
            }),
            /*#__PURE__*/ _jsx(Modal, {
                className: baseClass,
                slug: modalSlug,
                children: /*#__PURE__*/ _jsxs("div", {
                    className: `${baseClass}__template`,
                    children: [
                        /*#__PURE__*/ _jsx("h1", {
                            children: t('version:confirmPublish')
                        }),
                        /*#__PURE__*/ _jsx("p", {
                            children: t('version:aboutToPublishSelection', {
                                label: getTranslation(plural, i18n)
                            })
                        }),
                        /*#__PURE__*/ _jsx(Button, {
                            buttonStyle: "secondary",
                            id: "confirm-cancel",
                            onClick: submitted ? undefined : ()=>toggleModal(modalSlug),
                            type: "button",
                            children: t('general:cancel')
                        }),
                        /*#__PURE__*/ _jsx(Button, {
                            id: "confirm-publish",
                            onClick: submitted ? undefined : handlePublish,
                            children: submitted ? t('version:publishing') : t('general:confirm')
                        })
                    ]
                })
            })
        ]
    });
};

//# sourceMappingURL=index.js.map