'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import { ChevronIcon, NavGroup, useAuth, useConfig, useEntityVisibility, useNav, useTranslation } from '@payloadcms/ui';
import { EntityType, groupNavItems } from '@payloadcms/ui/shared';
import LinkWithDefault from 'next/link.js';
import React, { Fragment } from 'react';
const baseClass = 'nav';
export const DefaultNavClient = ()=>{
    const { permissions } = useAuth();
    const { isEntityVisible } = useEntityVisibility();
    const { collections, globals, routes: { admin } } = useConfig();
    const { i18n } = useTranslation();
    const { navOpen } = useNav();
    const groups = groupNavItems([
        ...collections.filter(({ slug })=>isEntityVisible({
                collectionSlug: slug
            })).map((collection)=>{
            const entityToGroup = {
                type: EntityType.collection,
                entity: collection
            };
            return entityToGroup;
        }),
        ...globals.filter(({ slug })=>isEntityVisible({
                globalSlug: slug
            })).map((global)=>{
            const entityToGroup = {
                type: EntityType.global,
                entity: global
            };
            return entityToGroup;
        })
    ], permissions, i18n);
    return /*#__PURE__*/ _jsx(Fragment, {
        children: groups.map(({ entities, label }, key)=>{
            return /*#__PURE__*/ _jsx(NavGroup, {
                label: label,
                children: entities.map(({ type, entity }, i)=>{
                    let entityLabel;
                    let href;
                    let id;
                    if (type === EntityType.collection) {
                        href = `${admin}/collections/${entity.slug}`;
                        entityLabel = getTranslation(entity.labels.plural, i18n);
                        id = `nav-${entity.slug}`;
                    }
                    if (type === EntityType.global) {
                        href = `${admin}/globals/${entity.slug}`;
                        entityLabel = getTranslation(entity.label, i18n);
                        id = `nav-global-${entity.slug}`;
                    }
                    const Link = LinkWithDefault.default || LinkWithDefault;
                    const LinkElement = Link || 'a';
                    return /*#__PURE__*/ _jsxs(LinkElement, {
                        className: `${baseClass}__link`,
                        href: href,
                        id: id,
                        tabIndex: !navOpen ? -1 : undefined,
                        children: [
                            /*#__PURE__*/ _jsx("span", {
                                className: `${baseClass}__link-icon`,
                                children: /*#__PURE__*/ _jsx(ChevronIcon, {
                                    direction: "right"
                                })
                            }),
                            /*#__PURE__*/ _jsx("span", {
                                className: `${baseClass}__link-label`,
                                children: entityLabel
                            })
                        ]
                    }, i);
                })
            }, key);
        })
    });
};

//# sourceMappingURL=index.client.js.map