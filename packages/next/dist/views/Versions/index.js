import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Gutter, ListQueryProvider } from '@payloadcms/ui';
import { notFound } from 'next/navigation.js';
import { isNumber } from 'payload/shared';
import React from 'react';
import { SetDocumentStepNav } from '../Edit/Default/SetDocumentStepNav/index.js';
import { buildVersionColumns } from './buildColumns.js';
import { getLatestVersion } from './getLatestVersion.js';
import { VersionsViewClient } from './index.client.js';
export const baseClass = 'versions';
export const VersionsView = async (props)=>{
    const { initPageResult, searchParams } = props;
    const { collectionConfig, docID: id, globalConfig, req, req: { i18n, payload, payload: { config }, user } } = initPageResult;
    const collectionSlug = collectionConfig?.slug;
    const globalSlug = globalConfig?.slug;
    const { limit, page, sort } = searchParams;
    const { routes: { api: apiRoute }, serverURL } = config;
    let versionsData;
    let limitToUse = isNumber(limit) ? Number(limit) : undefined;
    let latestPublishedVersion = null;
    let latestDraftVersion = null;
    if (collectionSlug) {
        limitToUse = limitToUse || collectionConfig.admin.pagination.defaultLimit;
        try {
            versionsData = await payload.findVersions({
                collection: collectionSlug,
                depth: 0,
                limit: limitToUse,
                overrideAccess: false,
                page: page ? parseInt(page.toString(), 10) : undefined,
                req,
                sort: sort,
                user,
                where: {
                    parent: {
                        equals: id
                    }
                }
            });
            if (collectionConfig?.versions?.drafts) {
                latestDraftVersion = await getLatestVersion(payload, collectionSlug, 'draft', 'collection');
                latestPublishedVersion = await getLatestVersion(payload, collectionSlug, 'published', 'collection');
            }
        } catch (error) {
            console.error(error) // eslint-disable-line no-console
            ;
        }
    }
    if (globalSlug) {
        limitToUse = limitToUse || 10;
        try {
            versionsData = await payload.findGlobalVersions({
                slug: globalSlug,
                depth: 0,
                limit: limitToUse,
                overrideAccess: false,
                page: page ? parseInt(page, 10) : undefined,
                req,
                sort: sort,
                user
            });
            if (globalConfig?.versions?.drafts) {
                latestDraftVersion = await getLatestVersion(payload, globalSlug, 'draft', 'global');
                latestPublishedVersion = await getLatestVersion(payload, globalSlug, 'published', 'global');
            }
        } catch (error) {
            console.error(error) // eslint-disable-line no-console
            ;
        }
        if (!versionsData) {
            return notFound();
        }
    }
    const fetchURL = collectionSlug ? `${serverURL}${apiRoute}/${collectionSlug}/versions` : globalSlug ? `${serverURL}${apiRoute}/globals/${globalSlug}/versions` : '';
    const publishedNewerThanDraft = latestPublishedVersion?.updatedAt > latestDraftVersion?.updatedAt;
    if (publishedNewerThanDraft) {
        latestDraftVersion = {
            id: '',
            updatedAt: ''
        };
    }
    const columns = buildVersionColumns({
        collectionConfig,
        config,
        docID: id,
        globalConfig,
        i18n,
        latestDraftVersion: latestDraftVersion?.id,
        latestPublishedVersion: latestPublishedVersion?.id
    });
    return /*#__PURE__*/ _jsxs(React.Fragment, {
        children: [
            /*#__PURE__*/ _jsx(SetDocumentStepNav, {
                collectionSlug: collectionConfig?.slug,
                globalSlug: globalConfig?.slug,
                id: id,
                pluralLabel: collectionConfig?.labels?.plural || globalConfig?.label,
                useAsTitle: collectionConfig?.admin?.useAsTitle || globalConfig?.slug,
                view: i18n.t('version:versions')
            }),
            /*#__PURE__*/ _jsx("main", {
                className: baseClass,
                children: /*#__PURE__*/ _jsx(Gutter, {
                    className: `${baseClass}__wrap`,
                    children: /*#__PURE__*/ _jsx(ListQueryProvider, {
                        data: versionsData,
                        defaultLimit: limitToUse,
                        defaultSort: sort,
                        modifySearchParams: true,
                        children: /*#__PURE__*/ _jsx(VersionsViewClient, {
                            baseClass: baseClass,
                            columns: columns,
                            fetchURL: fetchURL,
                            paginationLimits: collectionConfig?.admin?.pagination?.limits
                        })
                    })
                })
            })
        ]
    });
};

//# sourceMappingURL=index.js.map