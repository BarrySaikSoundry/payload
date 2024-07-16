'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import { Button, Popup, Translation, useAuth, useConfig, useDocumentInfo, useDrawerSlug, useLocale, useModal, useTranslation } from '@payloadcms/ui';
import { getFormState } from '@payloadcms/ui/shared';
import { deepCopyObject, reduceFieldsToValues } from 'payload/shared';
import React, { useCallback, useEffect, useState } from 'react';
import { Editor, Node, Transforms } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';
import { useElement } from '../../../providers/ElementProvider.js';
import { LinkDrawer } from '../LinkDrawer/index.js';
import { linkFieldsSchemaPath } from '../shared.js';
import { unwrapLink } from '../utilities.js';
import './index.scss';
const baseClass = 'rich-text-link';
/**
 * This function is called when an existing link is edited.
 * When a link is first created, another function is called: {@link ../Button/index.tsx#insertLink}
 */ const insertChange = (editor, fields)=>{
    const data = reduceFieldsToValues(fields, true);
    const [, parentPath] = Editor.above(editor);
    const newNode = {
        doc: data.doc,
        linkType: data.linkType,
        newTab: data.newTab,
        url: data.url
    };
    if (data.fields) newNode.fields = data.fields;
    Transforms.setNodes(editor, newNode, {
        at: parentPath
    });
    Transforms.delete(editor, {
        at: editor.selection.focus.path,
        unit: 'block'
    });
    Transforms.move(editor, {
        distance: 1,
        unit: 'offset'
    });
    Transforms.insertText(editor, String(data.text), {
        at: editor.selection.focus.path
    });
    ReactEditor.focus(editor);
};
export const LinkElement = ()=>{
    const { attributes, children, editorRef, element, fieldProps, schemaPath } = useElement();
    const fieldMapPath = `${schemaPath}.${linkFieldsSchemaPath}`;
    const { richTextComponentMap } = fieldProps;
    const fieldMap = richTextComponentMap.get(linkFieldsSchemaPath);
    const editor = useSlate();
    const config = useConfig();
    const { user } = useAuth();
    const { code: locale } = useLocale();
    const { i18n, t } = useTranslation();
    const { closeModal, openModal, toggleModal } = useModal();
    const [renderModal, setRenderModal] = useState(false);
    const [renderPopup, setRenderPopup] = useState(false);
    const [initialState, setInitialState] = useState({});
    const { id, collectionSlug } = useDocumentInfo();
    const drawerSlug = useDrawerSlug('rich-text-link');
    const handleTogglePopup = useCallback((render)=>{
        if (!render) {
            setRenderPopup(render);
        }
    }, []);
    useEffect(()=>{
        const awaitInitialState = async ()=>{
            const data = {
                doc: element.doc,
                fields: deepCopyObject(element.fields),
                linkType: element.linkType,
                newTab: element.newTab,
                text: Node.string(element),
                url: element.url
            };
            const state = await getFormState({
                apiRoute: config.routes.api,
                body: {
                    data,
                    operation: 'update',
                    schemaPath: fieldMapPath
                },
                serverURL: config.serverURL
            });
            setInitialState(state);
        };
        if (renderModal) {
            void awaitInitialState();
        }
    }, [
        renderModal,
        element,
        user,
        locale,
        t,
        collectionSlug,
        config,
        id,
        fieldMapPath
    ]);
    return /*#__PURE__*/ _jsxs("span", {
        className: baseClass,
        ...attributes,
        children: [
            /*#__PURE__*/ _jsxs("span", {
                contentEditable: false,
                style: {
                    userSelect: 'none'
                },
                children: [
                    renderModal && /*#__PURE__*/ _jsx(LinkDrawer, {
                        drawerSlug: drawerSlug,
                        fieldMap: Array.isArray(fieldMap) ? fieldMap : [],
                        handleClose: ()=>{
                            toggleModal(drawerSlug);
                            setRenderModal(false);
                        },
                        handleModalSubmit: (fields)=>{
                            insertChange(editor, fields);
                            closeModal(drawerSlug);
                            setRenderModal(false);
                        },
                        initialState: initialState
                    }),
                    /*#__PURE__*/ _jsx(Popup, {
                        boundingRef: editorRef,
                        buttonType: "none",
                        forceOpen: renderPopup,
                        horizontalAlign: "left",
                        onToggleOpen: handleTogglePopup,
                        render: ()=>/*#__PURE__*/ _jsxs("div", {
                                className: `${baseClass}__popup`,
                                children: [
                                    element.linkType === 'internal' && element.doc?.relationTo && element.doc?.value && /*#__PURE__*/ _jsx(Translation, {
                                        elements: {
                                            '0': ({ children })=>/*#__PURE__*/ _jsx("a", {
                                                    className: `${baseClass}__link-label`,
                                                    href: `${config.routes.admin}/collections/${element.doc.relationTo}/${element.doc.value}`,
                                                    rel: "noreferrer",
                                                    target: "_blank",
                                                    title: `${config.routes.admin}/collections/${element.doc.relationTo}/${element.doc.value}`,
                                                    children: children
                                                })
                                        },
                                        i18nKey: "fields:linkedTo",
                                        t: t,
                                        variables: {
                                            label: getTranslation(config.collections.find(({ slug })=>slug === element.doc.relationTo)?.labels?.singular, i18n)
                                        }
                                    }),
                                    (element.linkType === 'custom' || !element.linkType) && /*#__PURE__*/ _jsx("a", {
                                        className: `${baseClass}__link-label`,
                                        href: element.url,
                                        rel: "noreferrer",
                                        target: "_blank",
                                        title: element.url,
                                        children: element.url
                                    }),
                                    /*#__PURE__*/ _jsx(Button, {
                                        buttonStyle: "icon-label",
                                        className: `${baseClass}__link-edit`,
                                        icon: "edit",
                                        onClick: (e)=>{
                                            e.preventDefault();
                                            setRenderPopup(false);
                                            openModal(drawerSlug);
                                            setRenderModal(true);
                                        },
                                        round: true,
                                        tooltip: t('general:edit')
                                    }),
                                    /*#__PURE__*/ _jsx(Button, {
                                        buttonStyle: "icon-label",
                                        className: `${baseClass}__link-close`,
                                        icon: "x",
                                        onClick: (e)=>{
                                            e.preventDefault();
                                            unwrapLink(editor);
                                        },
                                        round: true,
                                        tooltip: t('general:remove')
                                    })
                                ]
                            }),
                        size: "fit-content",
                        verticalAlign: "bottom"
                    })
                ]
            }),
            /*#__PURE__*/ _jsx("span", {
                className: [
                    `${baseClass}__popup-toggler`
                ].filter(Boolean).join(' '),
                onClick: ()=>setRenderPopup(true),
                onKeyDown: (e)=>{
                    if (e.key === 'Enter') setRenderPopup(true);
                },
                role: "button",
                tabIndex: 0,
                children: children
            })
        ]
    });
};

//# sourceMappingURL=index.js.map