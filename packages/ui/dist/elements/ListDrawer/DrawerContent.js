'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useModal } from '@faceless-ui/modal';
import { getTranslation } from '@payloadcms/translations';
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { FieldLabel } from '../../fields/FieldLabel/index.js';
import { usePayloadAPI } from '../../hooks/usePayloadAPI.js';
import { XIcon } from '../../icons/X/index.js';
import { useAuth } from '../../providers/Auth/index.js';
import { useComponentMap } from '../../providers/ComponentMap/index.js';
import { useConfig } from '../../providers/Config/index.js';
import { ListInfoProvider } from '../../providers/ListInfo/index.js';
import { ListQueryProvider } from '../../providers/ListQuery/index.js';
import { usePreferences } from '../../providers/Preferences/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { useDocumentDrawer } from '../DocumentDrawer/index.js';
import { LoadingOverlay } from '../Loading/index.js';
import { Pill } from '../Pill/index.js';
import { ReactSelect } from '../ReactSelect/index.js';
import { TableColumnsProvider } from '../TableColumns/index.js';
import { ViewDescription } from '../ViewDescription/index.js';
import { baseClass } from './index.js';
const hoistQueryParamsToAnd = (where, queryParams)=>{
    if ('and' in where) {
        where.and.push(queryParams);
    } else if ('or' in where) {
        where = {
            and: [
                where,
                queryParams
            ]
        };
    } else {
        where = {
            and: [
                where,
                queryParams
            ]
        };
    }
    return where;
};
export const ListDrawerContent = ({ collectionSlugs, customHeader, drawerSlug, filterOptions, onSelect, selectedCollection })=>{
    const { i18n, t } = useTranslation();
    const { permissions } = useAuth();
    const { setPreference } = usePreferences();
    const { closeModal, isModalOpen } = useModal();
    const [limit, setLimit] = useState();
    const [sort, setSort] = useState(null);
    const [page, setPage] = useState(1);
    const [where, setWhere] = useState(null);
    const [search, setSearch] = useState('');
    const { componentMap } = useComponentMap();
    const { collections, routes: { api }, serverURL } = useConfig();
    const enabledCollectionConfigs = collections.filter(({ slug })=>{
        return collectionSlugs.includes(slug);
    });
    const [selectedCollectionConfig, setSelectedCollectionConfig] = useState(()=>{
        return enabledCollectionConfigs.find(({ slug })=>slug === selectedCollection) || enabledCollectionConfigs?.[0];
    });
    const { List } = componentMap.collections?.[selectedCollectionConfig?.slug] || {};
    const [selectedOption, setSelectedOption] = useState(()=>selectedCollectionConfig ? {
            label: getTranslation(selectedCollectionConfig.labels.singular, i18n),
            value: selectedCollectionConfig.slug
        } : undefined);
    // const [fields, setFields] = useState<Field[]>(() => formatFields(selectedCollectionConfig))
    useEffect(()=>{
    // setFields(formatFields(selectedCollectionConfig))
    }, [
        selectedCollectionConfig
    ]);
    // allow external control of selected collection, same as the initial state logic above
    useEffect(()=>{
        if (selectedCollection) {
            // if passed a selection, find it and check if it's enabled
            const selectedConfig = enabledCollectionConfigs.find(({ slug })=>slug === selectedCollection) || enabledCollectionConfigs?.[0];
            setSelectedCollectionConfig(selectedConfig);
        }
    }, [
        selectedCollection,
        enabledCollectionConfigs,
        onSelect,
        t
    ]);
    const preferenceKey = `${selectedCollectionConfig.slug}-list`;
    // this is the 'create new' drawer
    const [DocumentDrawer, DocumentDrawerToggler, { drawerSlug: documentDrawerSlug }] = useDocumentDrawer({
        collectionSlug: selectedCollectionConfig.slug
    });
    useEffect(()=>{
        if (selectedOption && !Array.isArray(selectedOption)) {
            setSelectedCollectionConfig(enabledCollectionConfigs.find(({ slug })=>selectedOption.value === slug));
        }
    }, [
        selectedOption,
        enabledCollectionConfigs
    ]);
    const collectionPermissions = permissions?.collections?.[selectedCollectionConfig?.slug];
    const hasCreatePermission = collectionPermissions?.create?.permission;
    // If modal is open, get active page of upload gallery
    const isOpen = isModalOpen(drawerSlug);
    const apiURL = isOpen ? `${serverURL}${api}/${selectedCollectionConfig.slug}` : null;
    const [cacheBust, dispatchCacheBust] = useReducer((state)=>state + 1, 0) // used to force a re-fetch even when apiURL is unchanged
    ;
    const [{ data, isError, isLoading: isLoadingList }, { setParams }] = usePayloadAPI(apiURL, {});
    const moreThanOneAvailableCollection = enabledCollectionConfigs.length > 1;
    useEffect(()=>{
        const { slug, admin: { listSearchableFields, useAsTitle } = {}, versions } = selectedCollectionConfig;
        const params = {};
        let copyOfWhere = {
            ...where || {}
        };
        const filterOption = filterOptions?.[slug];
        if (filterOptions && typeof filterOption !== 'boolean') {
            copyOfWhere = hoistQueryParamsToAnd(copyOfWhere, filterOption);
        }
        if (search) {
            const searchAsConditions = (listSearchableFields || [
                useAsTitle
            ]).map((fieldName)=>{
                return {
                    [fieldName]: {
                        like: search
                    }
                };
            }, []);
            if (searchAsConditions.length > 0) {
                const searchFilter = {
                    or: [
                        ...searchAsConditions
                    ]
                };
                copyOfWhere = hoistQueryParamsToAnd(copyOfWhere, searchFilter);
            }
        }
        if (page) params.page = page;
        if (sort) params.sort = sort;
        if (cacheBust) params.cacheBust = cacheBust;
        if (copyOfWhere) params.where = copyOfWhere;
        if (versions?.drafts) params.draft = 'true';
        setParams(params);
    }, [
        page,
        sort,
        where,
        search,
        cacheBust,
        filterOptions,
        selectedCollectionConfig,
        t,
        setParams
    ]);
    useEffect(()=>{
        const newPreferences = {
            limit,
            sort
        };
        void setPreference(preferenceKey, newPreferences, true);
    }, [
        sort,
        limit,
        setPreference,
        preferenceKey
    ]);
    const onCreateNew = useCallback(({ doc })=>{
        if (typeof onSelect === 'function') {
            onSelect({
                collectionSlug: selectedCollectionConfig.slug,
                docID: doc.id
            });
        }
        dispatchCacheBust();
        closeModal(documentDrawerSlug);
        closeModal(drawerSlug);
    }, [
        closeModal,
        documentDrawerSlug,
        drawerSlug,
        onSelect,
        selectedCollectionConfig
    ]);
    if (!selectedCollectionConfig || isError) {
        return null;
    }
    if (isLoadingList) {
        return /*#__PURE__*/ _jsx(LoadingOverlay, {});
    }
    return /*#__PURE__*/ _jsx(ListInfoProvider, {
        Header: /*#__PURE__*/ _jsxs("header", {
            className: `${baseClass}__header`,
            children: [
                /*#__PURE__*/ _jsxs("div", {
                    className: `${baseClass}__header-wrap`,
                    children: [
                        /*#__PURE__*/ _jsxs("div", {
                            className: `${baseClass}__header-content`,
                            children: [
                                /*#__PURE__*/ _jsx("h2", {
                                    className: `${baseClass}__header-text`,
                                    children: !customHeader ? getTranslation(selectedCollectionConfig?.labels?.plural, i18n) : customHeader
                                }),
                                hasCreatePermission && /*#__PURE__*/ _jsx(DocumentDrawerToggler, {
                                    className: `${baseClass}__create-new-button`,
                                    children: /*#__PURE__*/ _jsx(Pill, {
                                        children: t('general:createNew')
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ _jsx("button", {
                            "aria-label": t('general:close'),
                            className: `${baseClass}__header-close`,
                            onClick: ()=>{
                                closeModal(drawerSlug);
                            },
                            type: "button",
                            children: /*#__PURE__*/ _jsx(XIcon, {})
                        })
                    ]
                }),
                selectedCollectionConfig?.admin?.description && /*#__PURE__*/ _jsx("div", {
                    className: `${baseClass}__sub-header`,
                    children: /*#__PURE__*/ _jsx(ViewDescription, {
                        description: selectedCollectionConfig.admin.description
                    })
                }),
                moreThanOneAvailableCollection && /*#__PURE__*/ _jsxs("div", {
                    className: `${baseClass}__select-collection-wrap`,
                    children: [
                        /*#__PURE__*/ _jsx(FieldLabel, {
                            label: t('upload:selectCollectionToBrowse')
                        }),
                        /*#__PURE__*/ _jsx(ReactSelect, {
                            className: `${baseClass}__select-collection`,
                            onChange: setSelectedOption,
                            options: enabledCollectionConfigs.map((coll)=>({
                                    label: getTranslation(coll.labels.singular, i18n),
                                    value: coll.slug
                                })),
                            value: selectedOption
                        })
                    ]
                })
            ]
        }),
        collectionConfig: selectedCollectionConfig,
        collectionSlug: selectedCollectionConfig.slug,
        hasCreatePermission: hasCreatePermission,
        newDocumentURL: null,
        children: /*#__PURE__*/ _jsx(ListQueryProvider, {
            data: data,
            defaultLimit: limit || selectedCollectionConfig?.admin?.pagination?.defaultLimit,
            defaultSort: sort,
            handlePageChange: setPage,
            handlePerPageChange: setLimit,
            handleSearchChange: setSearch,
            handleSortChange: setSort,
            handleWhereChange: setWhere,
            modifySearchParams: false,
            preferenceKey: preferenceKey,
            children: /*#__PURE__*/ _jsxs(TableColumnsProvider, {
                cellProps: [
                    {
                        className: `${baseClass}__first-cell`,
                        link: false,
                        onClick: ({ collectionSlug: rowColl, rowData })=>{
                            if (typeof onSelect === 'function') {
                                onSelect({
                                    collectionSlug: rowColl,
                                    docID: rowData.id
                                });
                            }
                        }
                    }
                ],
                collectionSlug: selectedCollectionConfig.slug,
                preferenceKey: preferenceKey,
                children: [
                    List,
                    /*#__PURE__*/ _jsx(DocumentDrawer, {
                        onSave: onCreateNew
                    })
                ]
            })
        })
    });
};

//# sourceMappingURL=DrawerContent.js.map