'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '../../elements/Button/index.js';
import { useDocumentDrawer } from '../../elements/DocumentDrawer/index.js';
import { FileDetails } from '../../elements/FileDetails/index.js';
import { useListDrawer } from '../../elements/ListDrawer/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { FieldDescription } from '../FieldDescription/index.js';
import { FieldError } from '../FieldError/index.js';
import { FieldLabel } from '../FieldLabel/index.js';
import { fieldBaseClass } from '../shared/index.js';
import './index.scss';
const baseClass = 'upload';
export const UploadInput = (props)=>{
    const { CustomDescription, CustomError, CustomLabel, api = '/api', className, collection, customUploadActions, descriptionProps, errorProps, filterOptions, label, labelProps, onChange, readOnly, relationTo, required, serverURL, showError, style, value, width } = props;
    const { i18n, t } = useTranslation();
    const [fileDoc, setFileDoc] = useState(undefined);
    const [missingFile, setMissingFile] = useState(false);
    const [collectionSlugs] = useState([
        collection?.slug
    ]);
    const [DocumentDrawer, DocumentDrawerToggler, { closeDrawer }] = useDocumentDrawer({
        collectionSlug: collectionSlugs[0]
    });
    const [ListDrawer, ListDrawerToggler, { closeDrawer: closeListDrawer }] = useListDrawer({
        collectionSlugs,
        filterOptions
    });
    useEffect(()=>{
        if (value !== null && typeof value !== 'undefined' && value !== '') {
            const fetchFile = async ()=>{
                const response = await fetch(`${serverURL}${api}/${relationTo}/${value}`, {
                    credentials: 'include',
                    headers: {
                        'Accept-Language': i18n.language
                    }
                });
                if (response.ok) {
                    const json = await response.json();
                    setFileDoc(json);
                } else {
                    setMissingFile(true);
                    setFileDoc(undefined);
                }
            };
            void fetchFile();
        } else {
            setFileDoc(undefined);
        }
    }, [
        value,
        relationTo,
        api,
        serverURL,
        i18n
    ]);
    const onSave = useCallback((args)=>{
        setMissingFile(false);
        onChange(args.doc);
        closeDrawer();
    }, [
        onChange,
        closeDrawer
    ]);
    const onSelect = useCallback((args)=>{
        setMissingFile(false);
        onChange({
            id: args.docID
        });
        closeListDrawer();
    }, [
        onChange,
        closeListDrawer
    ]);
    if (collection.upload) {
        return /*#__PURE__*/ _jsxs("div", {
            className: [
                fieldBaseClass,
                baseClass,
                className,
                showError && 'error',
                readOnly && 'read-only'
            ].filter(Boolean).join(' '),
            style: {
                ...style,
                width
            },
            children: [
                /*#__PURE__*/ _jsx(FieldLabel, {
                    CustomLabel: CustomLabel,
                    label: label,
                    required: required,
                    ...labelProps || {}
                }),
                /*#__PURE__*/ _jsxs("div", {
                    className: `${fieldBaseClass}__wrap`,
                    children: [
                        /*#__PURE__*/ _jsx(FieldError, {
                            CustomError: CustomError,
                            ...errorProps || {}
                        }),
                        collection?.upload && /*#__PURE__*/ _jsxs(React.Fragment, {
                            children: [
                                fileDoc && !missingFile && /*#__PURE__*/ _jsx(FileDetails, {
                                    collectionSlug: relationTo,
                                    customUploadActions: customUploadActions,
                                    doc: fileDoc,
                                    handleRemove: readOnly ? undefined : ()=>{
                                        onChange(null);
                                    },
                                    uploadConfig: collection.upload
                                }),
                                (!fileDoc || missingFile) && /*#__PURE__*/ _jsx("div", {
                                    className: `${baseClass}__wrap`,
                                    children: /*#__PURE__*/ _jsxs("div", {
                                        className: `${baseClass}__buttons`,
                                        children: [
                                            /*#__PURE__*/ _jsx(DocumentDrawerToggler, {
                                                className: `${baseClass}__toggler`,
                                                disabled: readOnly,
                                                children: /*#__PURE__*/ _jsx(Button, {
                                                    buttonStyle: "secondary",
                                                    disabled: readOnly,
                                                    el: "div",
                                                    children: t('fields:uploadNewLabel', {
                                                        label: getTranslation(collection.labels.singular, i18n)
                                                    })
                                                })
                                            }),
                                            /*#__PURE__*/ _jsx(ListDrawerToggler, {
                                                className: `${baseClass}__toggler`,
                                                disabled: readOnly,
                                                children: /*#__PURE__*/ _jsx(Button, {
                                                    buttonStyle: "secondary",
                                                    disabled: readOnly,
                                                    el: "div",
                                                    children: t('fields:chooseFromExisting')
                                                })
                                            })
                                        ]
                                    })
                                }),
                                CustomDescription !== undefined ? CustomDescription : /*#__PURE__*/ _jsx(FieldDescription, {
                                    ...descriptionProps || {}
                                })
                            ]
                        }),
                        !readOnly && /*#__PURE__*/ _jsx(DocumentDrawer, {
                            onSave: onSave
                        }),
                        !readOnly && /*#__PURE__*/ _jsx(ListDrawer, {
                            onSelect: onSelect
                        })
                    ]
                })
            ]
        });
    }
    return null;
};

//# sourceMappingURL=Input.js.map