'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LoadingOverlayToggle, Pagination, PerPage, SetViewActions, Table, useComponentMap, useDocumentInfo, useListQuery, useTranslation } from '@payloadcms/ui';
import { useSearchParams } from 'next/navigation.js';
import React from 'react';
export const VersionsViewClient = (props)=>{
    const { baseClass, columns, paginationLimits } = props;
    const { getComponentMap } = useComponentMap();
    const { collectionSlug, globalSlug } = useDocumentInfo();
    const { data, handlePerPageChange } = useListQuery();
    const componentMap = getComponentMap({
        collectionSlug,
        globalSlug
    });
    const searchParams = useSearchParams();
    const limit = searchParams.get('limit');
    const { i18n } = useTranslation();
    const versionCount = data?.totalDocs || 0;
    return /*#__PURE__*/ _jsxs(React.Fragment, {
        children: [
            /*#__PURE__*/ _jsx(SetViewActions, {
                actions: componentMap?.actionsMap?.Edit?.Versions
            }),
            /*#__PURE__*/ _jsx(LoadingOverlayToggle, {
                name: "versions",
                show: !data
            }),
            versionCount === 0 && /*#__PURE__*/ _jsx("div", {
                className: `${baseClass}__no-versions`,
                children: i18n.t('version:noFurtherVersionsFound')
            }),
            versionCount > 0 && /*#__PURE__*/ _jsxs(React.Fragment, {
                children: [
                    /*#__PURE__*/ _jsx(Table, {
                        columns: columns,
                        data: data?.docs,
                        fieldMap: componentMap?.fieldMap
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: `${baseClass}__page-controls`,
                        children: [
                            /*#__PURE__*/ _jsx(Pagination, {
                                hasNextPage: data.hasNextPage,
                                hasPrevPage: data.hasPrevPage,
                                limit: data.limit,
                                nextPage: data.nextPage,
                                numberOfNeighbors: 1,
                                page: data.page,
                                prevPage: data.prevPage,
                                totalPages: data.totalPages
                            }),
                            data?.totalDocs > 0 && /*#__PURE__*/ _jsxs(React.Fragment, {
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
                                        limit: limit ? Number(limit) : 10,
                                        limits: paginationLimits
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=index.client.js.map