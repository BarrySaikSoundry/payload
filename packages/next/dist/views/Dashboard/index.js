import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HydrateClientUser } from '@payloadcms/ui';
import { EntityType, RenderCustomComponent, groupNavItems } from '@payloadcms/ui/shared';
import LinkImport from 'next/link.js';
import React, { Fragment } from 'react';
import { DefaultDashboard } from './Default/index.js';
export { generateDashboardMetadata } from './meta.js';
const Link = LinkImport.default || LinkImport;
export const Dashboard = ({ initPageResult, params, searchParams })=>{
    const { locale, permissions, req: { i18n, payload: { config }, payload, user }, visibleEntities } = initPageResult;
    const CustomDashboardComponent = config.admin.components?.views?.Dashboard;
    const collections = config.collections.filter((collection)=>permissions?.collections?.[collection.slug]?.read?.permission && visibleEntities.collections.includes(collection.slug));
    const globals = config.globals.filter((global)=>permissions?.globals?.[global.slug]?.read?.permission && visibleEntities.globals.includes(global.slug));
    const navGroups = groupNavItems([
        ...collections.map((collection)=>{
            const entityToGroup = {
                type: EntityType.collection,
                entity: collection
            };
            return entityToGroup;
        }) ?? [],
        ...globals.map((global)=>{
            const entityToGroup = {
                type: EntityType.global,
                entity: global
            };
            return entityToGroup;
        }) ?? []
    ], permissions, i18n);
    const viewComponentProps = {
        Link,
        i18n,
        locale,
        navGroups,
        params,
        payload,
        permissions,
        searchParams,
        user,
        visibleEntities
    };
    return /*#__PURE__*/ _jsxs(Fragment, {
        children: [
            /*#__PURE__*/ _jsx(HydrateClientUser, {
                permissions: permissions,
                user: user
            }),
            /*#__PURE__*/ _jsx(RenderCustomComponent, {
                CustomComponent: typeof CustomDashboardComponent === 'function' ? CustomDashboardComponent : undefined,
                DefaultComponent: DefaultDashboard,
                componentProps: viewComponentProps,
                serverOnlyProps: {
                    i18n,
                    locale,
                    params,
                    payload,
                    permissions,
                    searchParams,
                    user
                }
            })
        ]
    });
};

//# sourceMappingURL=index.js.map