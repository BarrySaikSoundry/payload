'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import React, { Fragment, useEffect } from 'react';
import { useComponentMap } from '../../providers/ComponentMap/index.js';
import { useConfig } from '../../providers/Config/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { formatDate } from '../../utilities/formatDate.js';
import { Autosave } from '../Autosave/index.js';
import { DeleteDocument } from '../DeleteDocument/index.js';
import { DuplicateDocument } from '../DuplicateDocument/index.js';
import { Gutter } from '../Gutter/index.js';
import { Popup, PopupList } from '../Popup/index.js';
import { PreviewButton } from '../PreviewButton/index.js';
import { PublishButton } from '../PublishButton/index.js';
import { SaveButton } from '../SaveButton/index.js';
import { SaveDraftButton } from '../SaveDraftButton/index.js';
import { Status } from '../Status/index.js';
import './index.scss';
const baseClass = 'doc-controls';
export const DocumentControls = (props)=>{
    const { id, slug, data, disableActions, hasSavePermission, isAccountView, isEditing, permissions } = props;
    const { i18n } = useTranslation();
    const config = useConfig();
    const { getComponentMap } = useComponentMap();
    const collectionConfig = config.collections.find((coll)=>coll.slug === slug);
    const globalConfig = config.globals.find((global)=>global.slug === slug);
    const componentMap = getComponentMap({
        collectionSlug: collectionConfig?.slug,
        globalSlug: globalConfig?.slug
    });
    const { admin: { dateFormat }, routes: { admin: adminRoute } } = config;
    // Settings these in state to avoid hydration issues if there is a mismatch between the server and client
    const [updatedAt, setUpdatedAt] = React.useState('');
    const [createdAt, setCreatedAt] = React.useState('');
    useEffect(()=>{
        if (data?.updatedAt) {
            setUpdatedAt(formatDate({
                date: data.updatedAt,
                i18n,
                pattern: dateFormat
            }));
        }
        if (data?.createdAt) {
            setCreatedAt(formatDate({
                date: data.createdAt,
                i18n,
                pattern: dateFormat
            }));
        }
    }, [
        data,
        i18n,
        dateFormat
    ]);
    const hasCreatePermission = permissions && 'create' in permissions && permissions.create?.permission;
    const hasDeletePermission = permissions && 'delete' in permissions && permissions.delete?.permission;
    const showDotMenu = Boolean(collectionConfig && id && !disableActions && (hasCreatePermission || hasDeletePermission));
    const unsavedDraftWithValidations = !id && collectionConfig?.versions?.drafts && collectionConfig.versions?.drafts.validate;
    return /*#__PURE__*/ _jsxs(Gutter, {
        className: baseClass,
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: `${baseClass}__wrapper`,
                children: [
                    /*#__PURE__*/ _jsx("div", {
                        className: `${baseClass}__content`,
                        children: /*#__PURE__*/ _jsxs("ul", {
                            className: `${baseClass}__meta`,
                            children: [
                                collectionConfig && !isEditing && !isAccountView && /*#__PURE__*/ _jsx("li", {
                                    className: `${baseClass}__list-item`,
                                    children: /*#__PURE__*/ _jsx("p", {
                                        className: `${baseClass}__value`,
                                        children: i18n.t('general:creatingNewLabel', {
                                            label: getTranslation(collectionConfig?.labels?.singular ?? i18n.t('general:document'), i18n)
                                        })
                                    })
                                }),
                                (collectionConfig?.versions?.drafts || globalConfig?.versions?.drafts) && /*#__PURE__*/ _jsxs(Fragment, {
                                    children: [
                                        (globalConfig || collectionConfig && isEditing) && /*#__PURE__*/ _jsx("li", {
                                            className: [
                                                `${baseClass}__status`,
                                                `${baseClass}__list-item`
                                            ].filter(Boolean).join(' '),
                                            children: /*#__PURE__*/ _jsx(Status, {})
                                        }),
                                        (collectionConfig?.versions?.drafts && collectionConfig?.versions?.drafts?.autosave && !unsavedDraftWithValidations || globalConfig?.versions?.drafts && globalConfig?.versions?.drafts?.autosave) && hasSavePermission && /*#__PURE__*/ _jsx("li", {
                                            className: `${baseClass}__list-item`,
                                            children: /*#__PURE__*/ _jsx(Autosave, {
                                                collection: collectionConfig,
                                                global: globalConfig,
                                                id: id,
                                                publishedDocUpdatedAt: data?.createdAt
                                            })
                                        })
                                    ]
                                }),
                                collectionConfig?.timestamps && (isEditing || isAccountView) && /*#__PURE__*/ _jsxs(Fragment, {
                                    children: [
                                        /*#__PURE__*/ _jsxs("li", {
                                            className: [
                                                `${baseClass}__list-item`,
                                                `${baseClass}__value-wrap`
                                            ].filter(Boolean).join(' '),
                                            title: data?.updatedAt ? updatedAt : '',
                                            children: [
                                                /*#__PURE__*/ _jsxs("p", {
                                                    className: `${baseClass}__label`,
                                                    children: [
                                                        i18n.t('general:lastModified'),
                                                        ": "
                                                    ]
                                                }),
                                                data?.updatedAt && /*#__PURE__*/ _jsx("p", {
                                                    className: `${baseClass}__value`,
                                                    children: updatedAt
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ _jsxs("li", {
                                            className: [
                                                `${baseClass}__list-item`,
                                                `${baseClass}__value-wrap`
                                            ].filter(Boolean).join(' '),
                                            title: data?.createdAt ? createdAt : '',
                                            children: [
                                                /*#__PURE__*/ _jsxs("p", {
                                                    className: `${baseClass}__label`,
                                                    children: [
                                                        i18n.t('general:created'),
                                                        ": "
                                                    ]
                                                }),
                                                data?.createdAt && /*#__PURE__*/ _jsx("p", {
                                                    className: `${baseClass}__value`,
                                                    children: createdAt
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ _jsxs("div", {
                        className: `${baseClass}__controls-wrapper`,
                        children: [
                            /*#__PURE__*/ _jsxs("div", {
                                className: `${baseClass}__controls`,
                                children: [
                                    componentMap?.isPreviewEnabled && /*#__PURE__*/ _jsx(PreviewButton, {
                                        CustomComponent: componentMap.PreviewButton
                                    }),
                                    hasSavePermission && /*#__PURE__*/ _jsx(React.Fragment, {
                                        children: collectionConfig?.versions?.drafts || globalConfig?.versions?.drafts ? /*#__PURE__*/ _jsxs(React.Fragment, {
                                            children: [
                                                (collectionConfig?.versions?.drafts && !collectionConfig?.versions?.drafts?.autosave || unsavedDraftWithValidations || globalConfig?.versions?.drafts && !globalConfig?.versions?.drafts?.autosave) && /*#__PURE__*/ _jsx(SaveDraftButton, {
                                                    CustomComponent: componentMap.SaveDraftButton
                                                }),
                                                /*#__PURE__*/ _jsx(PublishButton, {
                                                    CustomComponent: componentMap.PublishButton
                                                })
                                            ]
                                        }) : /*#__PURE__*/ _jsx(SaveButton, {
                                            CustomComponent: componentMap.SaveButton
                                        })
                                    })
                                ]
                            }),
                            showDotMenu && /*#__PURE__*/ _jsx(Popup, {
                                button: /*#__PURE__*/ _jsxs("div", {
                                    className: `${baseClass}__dots`,
                                    children: [
                                        /*#__PURE__*/ _jsx("div", {}),
                                        /*#__PURE__*/ _jsx("div", {}),
                                        /*#__PURE__*/ _jsx("div", {})
                                    ]
                                }),
                                className: `${baseClass}__popup`,
                                horizontalAlign: "right",
                                size: "large",
                                verticalAlign: "bottom",
                                children: /*#__PURE__*/ _jsxs(PopupList.ButtonGroup, {
                                    children: [
                                        hasCreatePermission && /*#__PURE__*/ _jsxs(React.Fragment, {
                                            children: [
                                                /*#__PURE__*/ _jsx(PopupList.Button, {
                                                    href: `${adminRoute}/collections/${collectionConfig?.slug}/create`,
                                                    id: "action-create",
                                                    children: i18n.t('general:createNew')
                                                }),
                                                !collectionConfig.disableDuplicate && isEditing && /*#__PURE__*/ _jsx(DuplicateDocument, {
                                                    id: id.toString(),
                                                    singularLabel: collectionConfig?.labels?.singular,
                                                    slug: collectionConfig?.slug
                                                })
                                            ]
                                        }),
                                        hasDeletePermission && /*#__PURE__*/ _jsx(DeleteDocument, {
                                            buttonId: "action-delete",
                                            collectionSlug: collectionConfig?.slug,
                                            id: id.toString(),
                                            singularLabel: collectionConfig?.labels?.singular,
                                            useAsTitle: collectionConfig?.admin?.useAsTitle
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ _jsx("div", {
                className: `${baseClass}__divider`
            })
        ]
    });
};

//# sourceMappingURL=index.js.map