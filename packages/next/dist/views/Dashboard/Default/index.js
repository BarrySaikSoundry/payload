import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import { Button, Card, Gutter, SetStepNav, SetViewActions } from '@payloadcms/ui';
import { EntityType, WithServerSideProps } from '@payloadcms/ui/shared';
import React, { Fragment } from 'react';
const baseClass = 'dashboard';
export const DefaultDashboard = (props)=>{
    const { Link, i18n, i18n: { t }, locale, navGroups, params, payload: { config: { admin: { components: { afterDashboard, beforeDashboard } }, routes: { admin: adminRoute } } }, payload, permissions, searchParams, user } = props;
    const BeforeDashboards = Array.isArray(beforeDashboard) ? beforeDashboard.map((Component, i)=>/*#__PURE__*/ _jsx(WithServerSideProps, {
            Component: Component,
            serverOnlyProps: {
                i18n,
                locale,
                params,
                payload,
                permissions,
                searchParams,
                user
            }
        }, i)) : null;
    const AfterDashboards = Array.isArray(afterDashboard) ? afterDashboard.map((Component, i)=>/*#__PURE__*/ _jsx(WithServerSideProps, {
            Component: Component,
            serverOnlyProps: {
                i18n,
                locale,
                params,
                payload,
                permissions,
                searchParams,
                user
            }
        }, i)) : null;
    return /*#__PURE__*/ _jsxs("div", {
        className: baseClass,
        children: [
            /*#__PURE__*/ _jsx(SetStepNav, {
                nav: []
            }),
            /*#__PURE__*/ _jsx(SetViewActions, {
                actions: []
            }),
            /*#__PURE__*/ _jsxs(Gutter, {
                className: `${baseClass}__wrap`,
                children: [
                    Array.isArray(BeforeDashboards) && BeforeDashboards.map((Component)=>Component),
                    /*#__PURE__*/ _jsxs(Fragment, {
                        children: [
                            /*#__PURE__*/ _jsx(SetViewActions, {
                                actions: []
                            }),
                            !navGroups || navGroups?.length === 0 ? /*#__PURE__*/ _jsx("p", {
                                children: "no nav groups...."
                            }) : navGroups.map(({ entities, label }, groupIndex)=>{
                                return /*#__PURE__*/ _jsxs("div", {
                                    className: `${baseClass}__group`,
                                    children: [
                                        /*#__PURE__*/ _jsx("h2", {
                                            className: `${baseClass}__label`,
                                            children: label
                                        }),
                                        /*#__PURE__*/ _jsx("ul", {
                                            className: `${baseClass}__card-list`,
                                            children: entities.map(({ type, entity }, entityIndex)=>{
                                                let title;
                                                let buttonAriaLabel;
                                                let createHREF;
                                                let href;
                                                let hasCreatePermission;
                                                if (type === EntityType.collection) {
                                                    title = getTranslation(entity.labels.plural, i18n);
                                                    buttonAriaLabel = t('general:showAllLabel', {
                                                        label: title
                                                    });
                                                    href = `${adminRoute}/collections/${entity.slug}`;
                                                    createHREF = `${adminRoute}/collections/${entity.slug}/create`;
                                                    hasCreatePermission = permissions?.collections?.[entity.slug]?.create?.permission;
                                                }
                                                if (type === EntityType.global) {
                                                    title = getTranslation(entity.label, i18n);
                                                    buttonAriaLabel = t('general:editLabel', {
                                                        label: getTranslation(entity.label, i18n)
                                                    });
                                                    href = `${adminRoute}/globals/${entity.slug}`;
                                                }
                                                return /*#__PURE__*/ _jsx("li", {
                                                    children: /*#__PURE__*/ _jsx(Card, {
                                                        Link: Link,
                                                        actions: hasCreatePermission && type === EntityType.collection ? /*#__PURE__*/ _jsx(Button, {
                                                            Link: Link,
                                                            "aria-label": t('general:createNewLabel', {
                                                                label: getTranslation(entity.labels.singular, i18n)
                                                            }),
                                                            buttonStyle: "icon-label",
                                                            el: "link",
                                                            icon: "plus",
                                                            iconStyle: "with-border",
                                                            round: true,
                                                            to: createHREF
                                                        }) : undefined,
                                                        buttonAriaLabel: buttonAriaLabel,
                                                        href: href,
                                                        id: `card-${entity.slug}`,
                                                        title: title,
                                                        titleAs: "h3"
                                                    })
                                                }, entityIndex);
                                            })
                                        })
                                    ]
                                }, groupIndex);
                            })
                        ]
                    }),
                    Array.isArray(AfterDashboards) && AfterDashboards.map((Component)=>Component)
                ]
            })
        ]
    });
};

//# sourceMappingURL=index.js.map