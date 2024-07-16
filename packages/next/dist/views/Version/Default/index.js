'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Gutter, SetViewActions, useComponentMap, useConfig, useDocumentInfo, usePayloadAPI, useTranslation } from '@payloadcms/ui';
import { formatDate } from '@payloadcms/ui/shared';
import React, { useState } from 'react';
import diffComponents from '../RenderFieldsToDiff/fields/index.js';
import RenderFieldsToDiff from '../RenderFieldsToDiff/index.js';
import Restore from '../Restore/index.js';
import { SelectComparison } from '../SelectComparison/index.js';
import { SelectLocales } from '../SelectLocales/index.js';
import { SetStepNav } from './SetStepNav.js';
const baseClass = 'view-version';
export const DefaultVersionView = ({ doc, docPermissions, initialComparisonDoc, latestDraftVersion, latestPublishedVersion, localeOptions, versionID })=>{
    const config = useConfig();
    const { i18n } = useTranslation();
    const { id, collectionSlug, globalSlug } = useDocumentInfo();
    const { getComponentMap, getFieldMap } = useComponentMap();
    const componentMap = getComponentMap({
        collectionSlug,
        globalSlug
    });
    const [fieldMap] = useState(()=>getFieldMap({
            collectionSlug,
            globalSlug
        }));
    const [collectionConfig] = useState(()=>config.collections.find((collection)=>collection.slug === collectionSlug));
    const [globalConfig] = useState(()=>config.globals.find((global)=>global.slug === globalSlug));
    const [locales, setLocales] = useState(localeOptions);
    const [compareValue, setCompareValue] = useState();
    const { admin: { dateFormat }, localization, routes: { api: apiRoute }, serverURL } = config;
    const versionCreatedAt = doc?.updatedAt ? formatDate({
        date: doc.updatedAt,
        i18n,
        pattern: dateFormat
    }) : '';
    const compareBaseURL = `${serverURL}${apiRoute}/${globalSlug ? 'globals/' : ''}${collectionSlug || globalSlug}/versions`;
    const compareFetchURL = compareValue?.value && `${compareBaseURL}/${compareValue.value}`;
    const [{ data: currentComparisonDoc }] = usePayloadAPI(compareFetchURL, {
        initialData: initialComparisonDoc,
        initialParams: {
            depth: 1,
            draft: 'true',
            locale: '*'
        }
    });
    const comparison = compareValue?.value && currentComparisonDoc?.version // the `version` key is only present on `versions` documents
    ;
    const canUpdate = docPermissions?.update?.permission;
    return /*#__PURE__*/ _jsxs("main", {
        className: baseClass,
        children: [
            /*#__PURE__*/ _jsx(SetViewActions, {
                actions: componentMap?.actionsMap?.Edit?.Version
            }),
            /*#__PURE__*/ _jsx(SetStepNav, {
                collectionConfig: collectionConfig,
                collectionSlug: collectionSlug,
                doc: doc,
                fieldMap: fieldMap,
                globalConfig: globalConfig,
                globalSlug: globalSlug,
                id: id
            }),
            /*#__PURE__*/ _jsxs(Gutter, {
                className: `${baseClass}__wrap`,
                children: [
                    /*#__PURE__*/ _jsxs("div", {
                        className: `${baseClass}__header-wrap`,
                        children: [
                            /*#__PURE__*/ _jsx("p", {
                                className: `${baseClass}__created-at`,
                                children: i18n.t('version:versionCreatedOn', {
                                    version: i18n.t(doc?.autosave ? 'version:autosavedVersion' : 'version:version')
                                })
                            }),
                            /*#__PURE__*/ _jsxs("header", {
                                className: `${baseClass}__header`,
                                children: [
                                    /*#__PURE__*/ _jsx("h2", {
                                        children: versionCreatedAt
                                    }),
                                    canUpdate && /*#__PURE__*/ _jsx(Restore, {
                                        className: `${baseClass}__restore`,
                                        collectionSlug: collectionSlug,
                                        globalSlug: globalSlug,
                                        label: collectionConfig?.labels.singular || globalConfig?.label,
                                        originalDocID: id,
                                        versionDate: versionCreatedAt,
                                        versionID: versionID
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: `${baseClass}__controls`,
                        children: [
                            /*#__PURE__*/ _jsx(SelectComparison, {
                                baseURL: compareBaseURL,
                                latestDraftVersion: latestDraftVersion,
                                latestPublishedVersion: latestPublishedVersion,
                                onChange: setCompareValue,
                                parentID: id,
                                value: compareValue,
                                versionID: versionID
                            }),
                            localization && /*#__PURE__*/ _jsx(SelectLocales, {
                                onChange: setLocales,
                                options: localeOptions,
                                value: locales
                            })
                        ]
                    }),
                    doc?.version && /*#__PURE__*/ _jsx(RenderFieldsToDiff, {
                        comparison: comparison,
                        diffComponents: diffComponents,
                        fieldMap: fieldMap,
                        fieldPermissions: docPermissions?.fields,
                        i18n: i18n,
                        locales: locales ? locales.map(({ label })=>typeof label === 'string' ? label : undefined) : [],
                        version: globalConfig ? {
                            ...doc?.version,
                            createdAt: doc?.version?.createdAt || doc.createdAt,
                            updatedAt: doc?.version?.updatedAt || doc.updatedAt
                        } : doc?.version
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=index.js.map