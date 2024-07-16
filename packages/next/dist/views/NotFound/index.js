import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HydrateClientUser } from '@payloadcms/ui';
import React, { Fragment } from 'react';
import { DefaultTemplate } from '../../templates/Default/index.js';
import { getNextRequestI18n } from '../../utilities/getNextRequestI18n.js';
import { initPage } from '../../utilities/initPage/index.js';
import { NotFoundClient } from './index.client.js';
export const generatePageMetadata = async ({ config: configPromise })=>{
    const config = await configPromise;
    const i18n = await getNextRequestI18n({
        config
    });
    return {
        title: i18n.t('general:notFound')
    };
};
export const NotFoundPage = async ({ config: configPromise, params, searchParams })=>{
    const config = await configPromise;
    const { routes: { admin: adminRoute } = {} } = config;
    const initPageResult = await initPage({
        config,
        redirectUnauthenticatedUser: true,
        route: `${adminRoute}/not-found`,
        searchParams
    });
    return /*#__PURE__*/ _jsxs(Fragment, {
        children: [
            /*#__PURE__*/ _jsx(HydrateClientUser, {
                permissions: initPageResult.permissions,
                user: initPageResult.req.user
            }),
            /*#__PURE__*/ _jsx(DefaultTemplate, {
                i18n: initPageResult.req.i18n,
                locale: initPageResult.locale,
                params: params,
                payload: initPageResult.req.payload,
                permissions: initPageResult.permissions,
                searchParams: searchParams,
                user: initPageResult.req.user,
                visibleEntities: initPageResult.visibleEntities,
                children: /*#__PURE__*/ _jsx(NotFoundClient, {})
            })
        ]
    });
};
export const NotFoundView = ()=>{
    return /*#__PURE__*/ _jsx(NotFoundClient, {
        marginTop: "large"
    });
};

//# sourceMappingURL=index.js.map