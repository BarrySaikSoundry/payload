'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import { Button, DeleteMany, EditMany, Gutter, ListControls, ListSelection, Pagination, PerPage, Pill, PublishMany, RelationshipProvider, SelectionProvider, SetViewActions, StaggeredShimmers, Table, UnpublishMany, useComponentMap, useConfig, useEditDepth, useListInfo, useListQuery, useSearchParams, useStepNav, useTranslation, useWindowInfo } from '@payloadcms/ui';
import LinkImport from 'next/link.js';
import { formatFilesize, isNumber } from 'payload/shared';
import React, { Fragment, useEffect } from 'react';
const baseClass = 'collection-list';
const Link = LinkImport.default || LinkImport;
export const DefaultListView = ()=>{
    const { Header, collectionSlug, hasCreatePermission, newDocumentURL } = useListInfo();
    const { data, defaultLimit, handlePageChange, handlePerPageChange } = useListQuery();
    const { searchParams } = useSearchParams();
    const config = useConfig();
    const { getComponentMap } = useComponentMap();
    const componentMap = getComponentMap({
        collectionSlug
    });
    const { AfterList, AfterListTable, BeforeList, BeforeListTable, Description, actionsMap, fieldMap } = componentMap || {};
    const collectionConfig = config.collections.find((collection)=>collection.slug === collectionSlug);
    const { labels } = collectionConfig;
    const { i18n } = useTranslation();
    const drawerDepth = useEditDepth();
    const { setStepNav } = useStepNav();
    const { breakpoints: { s: smallBreak } } = useWindowInfo();
    let docs = data.docs || [];
    if (collectionConfig.upload) {
        docs = docs?.map((doc)=>{
            return {
                ...doc,
                filesize: formatFilesize(doc.filesize)
            };
        });
    }
    useEffect(()=>{
        if (drawerDepth <= 1) {
            setStepNav([
                {
                    label: labels?.plural
                }
            ]);
        }
    }, [
        setStepNav,
        labels,
        drawerDepth
    ]);
    return /*#__PURE__*/ _jsxs("div", {
        className: baseClass,
        children: [
            /*#__PURE__*/ _jsx(SetViewActions, {
                actions: actionsMap?.List
            }),
            BeforeList,
            /*#__PURE__*/ _jsx(SelectionProvider, {
                docs: data.docs,
                totalDocs: data.totalDocs,
                children: /*#__PURE__*/ _jsxs(Gutter, {
                    className: `${baseClass}__wrap`,
                    children: [
                        /*#__PURE__*/ _jsx("header", {
                            className: `${baseClass}__header`,
                            children: Header || /*#__PURE__*/ _jsxs(Fragment, {
                                children: [
                                    /*#__PURE__*/ _jsx("h1", {
                                        children: getTranslation(labels?.plural, i18n)
                                    }),
                                    hasCreatePermission && /*#__PURE__*/ _jsx(Pill, {
                                        "aria-label": i18n.t('general:createNewLabel', {
                                            label: getTranslation(labels?.singular, i18n)
                                        }),
                                        to: newDocumentURL,
                                        children: i18n.t('general:createNew')
                                    }),
                                    !smallBreak && /*#__PURE__*/ _jsx(ListSelection, {
                                        label: getTranslation(collectionConfig.labels.plural, i18n)
                                    }),
                                    Description && /*#__PURE__*/ _jsx("div", {
                                        className: `${baseClass}__sub-header`,
                                        children: Description
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ _jsx(ListControls, {
                            collectionConfig: collectionConfig,
                            fieldMap: fieldMap
                        }),
                        BeforeListTable,
                        !data.docs && /*#__PURE__*/ _jsx(StaggeredShimmers, {
                            className: [
                                `${baseClass}__shimmer`,
                                `${baseClass}__shimmer--rows`
                            ].join(' '),
                            count: 6
                        }),
                        data.docs && data.docs.length > 0 && /*#__PURE__*/ _jsx(RelationshipProvider, {
                            children: /*#__PURE__*/ _jsx(Table, {
                                customCellContext: {
                                    collectionSlug,
                                    uploadConfig: collectionConfig.upload
                                },
                                data: docs,
                                fieldMap: fieldMap
                            })
                        }),
                        data.docs && data.docs.length === 0 && /*#__PURE__*/ _jsxs("div", {
                            className: `${baseClass}__no-results`,
                            children: [
                                /*#__PURE__*/ _jsx("p", {
                                    children: i18n.t('general:noResults', {
                                        label: getTranslation(labels?.plural, i18n)
                                    })
                                }),
                                hasCreatePermission && newDocumentURL && /*#__PURE__*/ _jsx(Button, {
                                    Link: Link,
                                    el: "link",
                                    to: newDocumentURL,
                                    children: i18n.t('general:createNewLabel', {
                                        label: getTranslation(labels?.singular, i18n)
                                    })
                                })
                            ]
                        }),
                        AfterListTable,
                        data.docs && data.docs.length > 0 && /*#__PURE__*/ _jsxs("div", {
                            className: `${baseClass}__page-controls`,
                            children: [
                                /*#__PURE__*/ _jsx(Pagination, {
                                    hasNextPage: data.hasNextPage,
                                    hasPrevPage: data.hasPrevPage,
                                    limit: data.limit,
                                    nextPage: data.nextPage,
                                    numberOfNeighbors: 1,
                                    onChange: handlePageChange,
                                    page: data.page,
                                    prevPage: data.prevPage,
                                    totalPages: data.totalPages
                                }),
                                data?.totalDocs > 0 && /*#__PURE__*/ _jsxs(Fragment, {
                                    children: [
                                        /*#__PURE__*/ _jsxs("div", {
                                            className: `${baseClass}__page-info`,
                                            children: [
                                                data.page * data.limit - (data.limit - 1),
                                                "-",
                                                data.totalPages > 1 && data.totalPages !== data.page ? data.limit * data.page : data.totalDocs,
                                                ' ',
                                                i18n.t('general:of'),
                                                " ",
                                                data.totalDocs
                                            ]
                                        }),
                                        /*#__PURE__*/ _jsx(PerPage, {
                                            handleChange: handlePerPageChange,
                                            limit: isNumber(searchParams?.limit) ? Number(searchParams.limit) : defaultLimit,
                                            limits: collectionConfig?.admin?.pagination?.limits,
                                            resetPage: data.totalDocs <= data.pagingCounter
                                        }),
                                        smallBreak && /*#__PURE__*/ _jsx("div", {
                                            className: `${baseClass}__list-selection`,
                                            children: /*#__PURE__*/ _jsxs(Fragment, {
                                                children: [
                                                    /*#__PURE__*/ _jsx(ListSelection, {
                                                        label: getTranslation(collectionConfig.labels.plural, i18n)
                                                    }),
                                                    /*#__PURE__*/ _jsxs("div", {
                                                        className: `${baseClass}__list-selection-actions`,
                                                        children: [
                                                            /*#__PURE__*/ _jsx(EditMany, {
                                                                collection: collectionConfig,
                                                                fieldMap: fieldMap
                                                            }),
                                                            /*#__PURE__*/ _jsx(PublishMany, {
                                                                collection: collectionConfig
                                                            }),
                                                            /*#__PURE__*/ _jsx(UnpublishMany, {
                                                                collection: collectionConfig
                                                            }),
                                                            /*#__PURE__*/ _jsx(DeleteMany, {
                                                                collection: collectionConfig
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            }),
            AfterList
        ]
    });
};

//# sourceMappingURL=index.js.map