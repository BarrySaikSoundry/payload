'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useModal } from '@faceless-ui/modal';
import * as qs from 'qs-esm';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useRelatedCollections } from '../../fields/Relationship/AddNew/useRelatedCollections.js';
import { XIcon } from '../../icons/X/index.js';
import { useComponentMap } from '../../providers/ComponentMap/index.js';
import { useConfig } from '../../providers/Config/index.js';
import { DocumentInfoProvider, useDocumentInfo } from '../../providers/DocumentInfo/index.js';
import { useFormQueryParams } from '../../providers/FormQueryParams/index.js';
import { useLocale } from '../../providers/Locale/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { Gutter } from '../Gutter/index.js';
import { IDLabel } from '../IDLabel/index.js';
import { RenderTitle } from '../RenderTitle/index.js';
import { baseClass } from './index.js';
export const DocumentDrawerContent = ({ id: existingDocID, Header, collectionSlug, drawerSlug, onSave: onSaveFromProps })=>{
    const config = useConfig();
    const { routes: { api: apiRoute }, serverURL } = config;
    const { closeModal, modalState, toggleModal } = useModal();
    const locale = useLocale();
    const { t } = useTranslation();
    const [docID, setDocID] = useState(existingDocID);
    const [isOpen, setIsOpen] = useState(false);
    const [collectionConfig] = useRelatedCollections(collectionSlug);
    const { formQueryParams } = useFormQueryParams();
    const formattedQueryParams = qs.stringify(formQueryParams);
    const { componentMap } = useComponentMap();
    const { Edit } = componentMap[`${collectionSlug ? 'collections' : 'globals'}`][collectionSlug];
    const isEditing = Boolean(docID);
    const apiURL = docID ? `${serverURL}${apiRoute}/${collectionSlug}/${docID}${locale?.code ? `?locale=${locale.code}` : ''}` : null;
    const action = `${serverURL}${apiRoute}/${collectionSlug}${isEditing ? `/${docID}` : ''}?${formattedQueryParams}`;
    useEffect(()=>{
        setIsOpen(Boolean(modalState[drawerSlug]?.isOpen));
    }, [
        modalState,
        drawerSlug
    ]);
    const onLoadError = React.useCallback((data)=>{
        if (isOpen) {
            closeModal(drawerSlug);
            toast.error(data.errors?.[0].message || t('error:unspecific'));
        }
    }, [
        closeModal,
        drawerSlug,
        isOpen,
        t
    ]);
    const onSave = useCallback((args)=>{
        setDocID(args.doc.id);
        if (typeof onSaveFromProps === 'function') {
            void onSaveFromProps({
                ...args,
                collectionConfig
            });
        }
    }, [
        onSaveFromProps,
        collectionConfig
    ]);
    return /*#__PURE__*/ _jsx(DocumentInfoProvider, {
        BeforeDocument: /*#__PURE__*/ _jsxs(Gutter, {
            className: `${baseClass}__header`,
            children: [
                /*#__PURE__*/ _jsxs("div", {
                    className: `${baseClass}__header-content`,
                    children: [
                        /*#__PURE__*/ _jsx("h2", {
                            className: `${baseClass}__header-text`,
                            children: Header || /*#__PURE__*/ _jsx(RenderTitle, {
                                element: "span"
                            })
                        }),
                        /*#__PURE__*/ _jsx("button", {
                            "aria-label": t('general:close'),
                            className: `${baseClass}__header-close`,
                            onClick: ()=>toggleModal(drawerSlug),
                            type: "button",
                            children: /*#__PURE__*/ _jsx(XIcon, {})
                        })
                    ]
                }),
                /*#__PURE__*/ _jsx(DocumentTitle, {})
            ]
        }),
        action: action,
        apiURL: apiURL,
        collectionSlug: collectionConfig.slug,
        disableActions: true,
        disableLeaveWithoutSaving: true,
        id: docID,
        isEditing: isEditing,
        onLoadError: onLoadError,
        onSave: onSave,
        children: Edit
    });
};
const DocumentTitle = ()=>{
    const { id, title } = useDocumentInfo();
    return id && id !== title ? /*#__PURE__*/ _jsx(IDLabel, {
        id: id.toString()
    }) : null;
};

//# sourceMappingURL=DrawerContent.js.map