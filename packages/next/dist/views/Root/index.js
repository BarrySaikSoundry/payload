import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { WithServerSideProps } from '@payloadcms/ui/shared';
import { notFound, redirect } from 'next/navigation.js';
import React, { Fragment } from 'react';
import { DefaultTemplate } from '../../templates/Default/index.js';
import { MinimalTemplate } from '../../templates/Minimal/index.js';
import { initPage } from '../../utilities/initPage/index.js';
import { getViewFromConfig } from './getViewFromConfig.js';
export { generatePageMetadata } from './meta.js';
export const RootPage = async ({ config: configPromise, params, searchParams })=>{
    const config = await configPromise;
    const { admin: { routes: { createFirstUser: createFirstUserRoute }, user: userSlug }, routes: { admin: adminRoute } } = config;
    const currentRoute = `${adminRoute}${Array.isArray(params.segments) ? `/${params.segments.join('/')}` : ''}`;
    const segments = Array.isArray(params.segments) ? params.segments : [];
    const { DefaultView, initPageOptions, templateClassName, templateType } = getViewFromConfig({
        adminRoute,
        config,
        currentRoute,
        searchParams,
        segments
    });
    let dbHasUser = false;
    if (!DefaultView) {
        notFound();
    }
    const initPageResult = await initPage(initPageOptions);
    if (initPageResult) {
        dbHasUser = await initPageResult?.req.payload.db.findOne({
            collection: userSlug,
            req: initPageResult?.req
        })?.then((doc)=>!!doc);
        const routeWithAdmin = `${adminRoute}${createFirstUserRoute}`;
        const collectionConfig = config.collections.find(({ slug })=>slug === userSlug);
        const disableLocalStrategy = collectionConfig?.auth?.disableLocalStrategy;
        if (disableLocalStrategy && currentRoute === routeWithAdmin) {
            redirect(adminRoute);
        }
        if (!dbHasUser && currentRoute !== routeWithAdmin && !disableLocalStrategy) {
            redirect(routeWithAdmin);
        }
        if (dbHasUser && currentRoute === routeWithAdmin) {
            redirect(adminRoute);
        }
    }
    const RenderedView = /*#__PURE__*/ _jsx(WithServerSideProps, {
        Component: DefaultView,
        serverOnlyProps: {
            initPageResult,
            params,
            searchParams
        }
    });
    return /*#__PURE__*/ _jsxs(Fragment, {
        children: [
            !templateType && /*#__PURE__*/ _jsx(Fragment, {
                children: RenderedView
            }),
            templateType === 'minimal' && /*#__PURE__*/ _jsx(MinimalTemplate, {
                className: templateClassName,
                children: RenderedView
            }),
            templateType === 'default' && /*#__PURE__*/ _jsx(DefaultTemplate, {
                i18n: initPageResult?.req.i18n,
                locale: initPageResult?.locale,
                params: params,
                payload: initPageResult?.req.payload,
                permissions: initPageResult?.permissions,
                searchParams: searchParams,
                user: initPageResult?.req.user,
                visibleEntities: {
                    // The reason we are not passing in initPageResult.visibleEntities directly is due to a "Cannot assign to read only property of object '#<Object>" error introduced in React 19
                    // which this caused as soon as initPageResult.visibleEntities is passed in
                    collections: initPageResult.visibleEntities?.collections,
                    globals: initPageResult.visibleEntities?.globals
                },
                children: RenderedView
            })
        ]
    });
};

//# sourceMappingURL=index.js.map