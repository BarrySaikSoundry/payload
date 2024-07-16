'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useModal } from '@faceless-ui/modal';
import { getTranslation } from '@payloadcms/translations';
import { useRouter } from 'next/navigation.js';
import React, { useCallback, useState } from 'react';
import { useForm } from '../../forms/Form/context.js';
import { Form } from '../../forms/Form/index.js';
import { RenderFields } from '../../forms/RenderFields/index.js';
import { FormSubmit } from '../../forms/Submit/index.js';
import { XIcon } from '../../icons/X/index.js';
import { useAuth } from '../../providers/Auth/index.js';
import { useConfig } from '../../providers/Config/index.js';
import { DocumentInfoProvider } from '../../providers/DocumentInfo/index.js';
import { OperationContext } from '../../providers/Operation/index.js';
import { useRouteCache } from '../../providers/RouteCache/index.js';
import { useSearchParams } from '../../providers/SearchParams/index.js';
import { SelectAllStatus, useSelection } from '../../providers/Selection/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { getFormState } from '../../utilities/getFormState.js';
import { Drawer, DrawerToggler } from '../Drawer/index.js';
import { FieldSelect } from '../FieldSelect/index.js';
import './index.scss';
const baseClass = 'edit-many';
const Submit = ({ action, disabled })=>{
    const { submit } = useForm();
    const { t } = useTranslation();
    const save = useCallback(()=>{
        void submit({
            action,
            method: 'PATCH',
            skipValidation: true
        });
    }, [
        action,
        submit
    ]);
    return /*#__PURE__*/ _jsx(FormSubmit, {
        className: `${baseClass}__save`,
        disabled: disabled,
        onClick: save,
        children: t('general:save')
    });
};
const PublishButton = ({ action, disabled })=>{
    const { submit } = useForm();
    const { t } = useTranslation();
    const save = useCallback(()=>{
        void submit({
            action,
            method: 'PATCH',
            overrides: {
                _status: 'published'
            },
            skipValidation: true
        });
    }, [
        action,
        submit
    ]);
    return /*#__PURE__*/ _jsx(FormSubmit, {
        className: `${baseClass}__publish`,
        disabled: disabled,
        onClick: save,
        children: t('version:publishChanges')
    });
};
const SaveDraftButton = ({ action, disabled })=>{
    const { submit } = useForm();
    const { t } = useTranslation();
    const save = useCallback(()=>{
        void submit({
            action,
            method: 'PATCH',
            overrides: {
                _status: 'draft'
            },
            skipValidation: true
        });
    }, [
        action,
        submit
    ]);
    return /*#__PURE__*/ _jsx(FormSubmit, {
        className: `${baseClass}__draft`,
        disabled: disabled,
        onClick: save,
        children: t('version:saveDraft')
    });
};
export const EditMany = (props)=>{
    const { collection: { slug, labels: { plural } } = {}, collection, fieldMap } = props;
    const { permissions } = useAuth();
    const { closeModal } = useModal();
    const { routes: { api: apiRoute }, serverURL } = useConfig();
    const { count, getQueryParams, selectAll } = useSelection();
    const { i18n, t } = useTranslation();
    const [selected, setSelected] = useState([]);
    const { stringifyParams } = useSearchParams();
    const router = useRouter();
    const [initialState, setInitialState] = useState();
    const hasInitializedState = React.useRef(false);
    const { clearRouteCache } = useRouteCache();
    const collectionPermissions = permissions?.collections?.[slug];
    const hasUpdatePermission = collectionPermissions?.update?.permission;
    const drawerSlug = `edit-${slug}`;
    React.useEffect(()=>{
        if (!hasInitializedState.current) {
            const getInitialState = async ()=>{
                const result = await getFormState({
                    apiRoute,
                    body: {
                        collectionSlug: slug,
                        data: {},
                        operation: 'update',
                        schemaPath: slug
                    },
                    serverURL
                });
                setInitialState(result);
                hasInitializedState.current = true;
            };
            void getInitialState();
        }
    }, [
        apiRoute,
        hasInitializedState,
        serverURL,
        slug
    ]);
    const onChange = useCallback(({ formState: prevFormState })=>getFormState({
            apiRoute,
            body: {
                collectionSlug: slug,
                formState: prevFormState,
                operation: 'update',
                schemaPath: slug
            },
            serverURL
        }), [
        serverURL,
        apiRoute,
        slug
    ]);
    if (selectAll === SelectAllStatus.None || !hasUpdatePermission) {
        return null;
    }
    const onSuccess = ()=>{
        router.replace(stringifyParams({
            params: {
                page: selectAll === SelectAllStatus.AllAvailable ? '1' : undefined
            }
        }));
        clearRouteCache();
        closeModal(drawerSlug);
    };
    return /*#__PURE__*/ _jsxs("div", {
        className: baseClass,
        children: [
            /*#__PURE__*/ _jsx(DrawerToggler, {
                "aria-label": t('general:edit'),
                className: `${baseClass}__toggle`,
                onClick: ()=>{
                    setSelected([]);
                },
                slug: drawerSlug,
                children: t('general:edit')
            }),
            /*#__PURE__*/ _jsx(Drawer, {
                Header: null,
                slug: drawerSlug,
                children: /*#__PURE__*/ _jsx(DocumentInfoProvider, {
                    collectionSlug: slug,
                    id: null,
                    children: /*#__PURE__*/ _jsx(OperationContext.Provider, {
                        value: "update",
                        children: /*#__PURE__*/ _jsxs("div", {
                            className: `${baseClass}__main`,
                            children: [
                                /*#__PURE__*/ _jsxs("div", {
                                    className: `${baseClass}__header`,
                                    children: [
                                        /*#__PURE__*/ _jsx("h2", {
                                            className: `${baseClass}__header__title`,
                                            children: t('general:editingLabel', {
                                                count,
                                                label: getTranslation(plural, i18n)
                                            })
                                        }),
                                        /*#__PURE__*/ _jsx("button", {
                                            "aria-label": t('general:close'),
                                            className: `${baseClass}__header__close`,
                                            id: `close-drawer__${drawerSlug}`,
                                            onClick: ()=>closeModal(drawerSlug),
                                            type: "button",
                                            children: /*#__PURE__*/ _jsx(XIcon, {})
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ _jsxs(Form, {
                                    className: `${baseClass}__form`,
                                    initialState: initialState,
                                    onChange: [
                                        onChange
                                    ],
                                    onSuccess: onSuccess,
                                    children: [
                                        /*#__PURE__*/ _jsx(FieldSelect, {
                                            fieldMap: fieldMap,
                                            setSelected: setSelected
                                        }),
                                        selected.length === 0 ? null : /*#__PURE__*/ _jsx(RenderFields, {
                                            fieldMap: selected,
                                            path: "",
                                            readOnly: false,
                                            schemaPath: slug
                                        }),
                                        /*#__PURE__*/ _jsx("div", {
                                            className: `${baseClass}__sidebar-wrap`,
                                            children: /*#__PURE__*/ _jsx("div", {
                                                className: `${baseClass}__sidebar`,
                                                children: /*#__PURE__*/ _jsx("div", {
                                                    className: `${baseClass}__sidebar-sticky-wrap`,
                                                    children: /*#__PURE__*/ _jsx("div", {
                                                        className: `${baseClass}__document-actions`,
                                                        children: collection?.versions?.drafts ? /*#__PURE__*/ _jsxs(React.Fragment, {
                                                            children: [
                                                                /*#__PURE__*/ _jsx(PublishButton, {
                                                                    action: `${serverURL}${apiRoute}/${slug}${getQueryParams()}&draft=true`,
                                                                    disabled: selected.length === 0
                                                                }),
                                                                /*#__PURE__*/ _jsx(SaveDraftButton, {
                                                                    action: `${serverURL}${apiRoute}/${slug}${getQueryParams()}&draft=true`,
                                                                    disabled: selected.length === 0
                                                                })
                                                            ]
                                                        }) : /*#__PURE__*/ _jsx(Submit, {
                                                            action: `${serverURL}${apiRoute}/${slug}${getQueryParams()}`,
                                                            disabled: selected.length === 0
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    ]
                                })
                            ]
                        })
                    })
                })
            })
        ]
    });
};

//# sourceMappingURL=index.js.map