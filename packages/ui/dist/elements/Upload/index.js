'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { isImage, reduceFieldsToValues } from 'payload/shared';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { FieldError } from '../../fields/FieldError/index.js';
import { fieldBaseClass } from '../../fields/shared/index.js';
import { useForm } from '../../forms/Form/context.js';
import { useField } from '../../forms/useField/index.js';
import { useDocumentInfo } from '../../providers/DocumentInfo/index.js';
import { useFormQueryParams } from '../../providers/FormQueryParams/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { Button } from '../Button/index.js';
import { Drawer, DrawerToggler } from '../Drawer/index.js';
import { Dropzone } from '../Dropzone/index.js';
import { EditUpload } from '../EditUpload/index.js';
import { FileDetails } from '../FileDetails/index.js';
import { PreviewSizes } from '../PreviewSizes/index.js';
import { Thumbnail } from '../Thumbnail/index.js';
import './index.scss';
const baseClass = 'file-field';
export const editDrawerSlug = 'edit-upload';
export const sizePreviewSlug = 'preview-sizes';
const validate = (value)=>{
    if (!value && value !== undefined) {
        return 'A file is required.';
    }
    return true;
};
export const UploadActions = ({ customActions, enableAdjustments, enablePreviewSizes, mimeType })=>{
    const { t } = useTranslation();
    const fileTypeIsAdjustable = isImage(mimeType) && mimeType !== 'image/svg+xml';
    if (!fileTypeIsAdjustable && (!customActions || customActions.length === 0)) return null;
    return /*#__PURE__*/ _jsxs("div", {
        className: `${baseClass}__upload-actions`,
        children: [
            fileTypeIsAdjustable && /*#__PURE__*/ _jsxs(React.Fragment, {
                children: [
                    enablePreviewSizes && /*#__PURE__*/ _jsx(DrawerToggler, {
                        className: `${baseClass}__previewSizes`,
                        slug: sizePreviewSlug,
                        children: t('upload:previewSizes')
                    }),
                    enableAdjustments && /*#__PURE__*/ _jsx(DrawerToggler, {
                        className: `${baseClass}__edit`,
                        slug: editDrawerSlug,
                        children: t('upload:editImage')
                    })
                ]
            }),
            customActions && customActions.map((CustomAction, i)=>{
                return /*#__PURE__*/ _jsx(React.Fragment, {
                    children: CustomAction
                }, i);
            })
        ]
    });
};
export const Upload = (props)=>{
    const { collectionSlug, customActions, initialState, onChange, uploadConfig } = props;
    const [replacingFile, setReplacingFile] = useState(false);
    const [fileSrc, setFileSrc] = useState(null);
    const { t } = useTranslation();
    const { setModified } = useForm();
    const { dispatchFormQueryParams, formQueryParams } = useFormQueryParams();
    const [doc, setDoc] = useState(reduceFieldsToValues(initialState || {}, true));
    const { docPermissions } = useDocumentInfo();
    const { errorMessage, setValue, showError, value } = useField({
        path: 'file',
        validate
    });
    const [_crop, setCrop] = useState({
        x: 0,
        y: 0
    });
    const [showUrlInput, setShowUrlInput] = useState(false);
    const [fileUrl, setFileUrl] = useState('');
    const cursorPositionRef = useRef(null);
    const urlInputRef = useRef(null);
    const handleFileChange = useCallback((newFile)=>{
        if (newFile instanceof File) {
            const fileReader = new FileReader();
            fileReader.onload = (e)=>{
                const imgSrc = e.target?.result;
                if (typeof imgSrc === 'string') {
                    setFileSrc(imgSrc);
                }
            };
            fileReader.readAsDataURL(newFile);
        }
        setValue(newFile);
        setShowUrlInput(false);
        if (typeof onChange === 'function') {
            onChange(newFile);
        }
    }, [
        onChange,
        setValue
    ]);
    const handleFileNameChange = (e)=>{
        const updatedFileName = e.target.value;
        const cursorPosition = e.target.selectionStart;
        cursorPositionRef.current = cursorPosition;
        if (value) {
            const fileValue = value;
            // Creating a new File object with updated properties
            const newFile = new File([
                fileValue
            ], updatedFileName, {
                type: fileValue.type
            });
            handleFileChange(newFile);
        }
    };
    useEffect(()=>{
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        const inputElement = document.querySelector(`.${baseClass}__filename`);
        if (inputElement && cursorPositionRef.current !== null) {
            inputElement.setSelectionRange(cursorPositionRef.current, cursorPositionRef.current);
        }
    }, [
        value
    ]);
    const handleFileSelection = useCallback((files)=>{
        const fileToUpload = files?.[0];
        handleFileChange(fileToUpload);
    }, [
        handleFileChange
    ]);
    const handleFileRemoval = useCallback(()=>{
        setReplacingFile(true);
        handleFileChange(null);
        setFileSrc('');
        setFileUrl('');
        setDoc({});
        setShowUrlInput(false);
    }, [
        handleFileChange
    ]);
    const onEditsSave = useCallback(({ crop, focalPosition })=>{
        setCrop({
            x: crop.x || 0,
            y: crop.y || 0
        });
        setModified(true);
        dispatchFormQueryParams({
            type: 'SET',
            params: {
                uploadEdits: crop || focalPosition ? {
                    crop: crop || null,
                    focalPoint: focalPosition ? focalPosition : null
                } : null
            }
        });
    }, [
        dispatchFormQueryParams,
        setModified
    ]);
    const handlePasteUrlClick = ()=>{
        setShowUrlInput((prev)=>!prev);
    };
    const handleUrlSubmit = async ()=>{
        if (fileUrl) {
            try {
                const response = await fetch(fileUrl);
                const data = await response.blob();
                // Extract the file name from the URL
                const fileName = fileUrl.split('/').pop();
                // Create a new File object from the Blob data
                const file = new File([
                    data
                ], fileName, {
                    type: data.type
                });
                handleFileChange(file);
            } catch (e) {
                toast.error(e.message);
            }
        }
    };
    useEffect(()=>{
        setDoc(reduceFieldsToValues(initialState || {}, true));
        setReplacingFile(false);
    }, [
        initialState
    ]);
    useEffect(()=>{
        if (showUrlInput && urlInputRef.current) {
            urlInputRef.current.focus() // Focus on the remote-url input field when showUrlInput is true
            ;
        }
    }, [
        showUrlInput
    ]);
    const canRemoveUpload = docPermissions?.update?.permission && 'delete' in docPermissions && docPermissions?.delete?.permission;
    const hasImageSizes = uploadConfig?.imageSizes?.length > 0;
    const hasResizeOptions = Boolean(uploadConfig?.resizeOptions);
    // Explicity check if set to true, default is undefined
    const focalPointEnabled = uploadConfig?.focalPoint === true;
    const { crop: showCrop = true, focalPoint = true } = uploadConfig;
    const showFocalPoint = focalPoint && (hasImageSizes || hasResizeOptions || focalPointEnabled);
    return /*#__PURE__*/ _jsxs("div", {
        className: [
            fieldBaseClass,
            baseClass
        ].filter(Boolean).join(' '),
        children: [
            /*#__PURE__*/ _jsx(FieldError, {
                message: errorMessage,
                showError: showError
            }),
            doc.filename && !replacingFile && /*#__PURE__*/ _jsx(FileDetails, {
                collectionSlug: collectionSlug,
                customUploadActions: customActions,
                doc: doc,
                enableAdjustments: showCrop || showFocalPoint,
                handleRemove: canRemoveUpload ? handleFileRemoval : undefined,
                hasImageSizes: hasImageSizes,
                imageCacheTag: doc.updatedAt,
                uploadConfig: uploadConfig
            }),
            (!doc.filename || replacingFile) && /*#__PURE__*/ _jsxs("div", {
                className: `${baseClass}__upload`,
                children: [
                    !value && !showUrlInput && /*#__PURE__*/ _jsx(Dropzone, {
                        className: `${baseClass}__dropzone`,
                        mimeTypes: uploadConfig?.mimeTypes,
                        onChange: handleFileSelection,
                        onPasteUrlClick: handlePasteUrlClick
                    }),
                    showUrlInput && /*#__PURE__*/ _jsxs(React.Fragment, {
                        children: [
                            /*#__PURE__*/ _jsxs("div", {
                                className: `${baseClass}__remote-file-wrap`,
                                children: [
                                    /*#__PURE__*/ _jsx("input", {
                                        className: `${baseClass}__remote-file`,
                                        onChange: (e)=>{
                                            setFileUrl(e.target.value);
                                        },
                                        ref: urlInputRef,
                                        type: "text",
                                        value: fileUrl
                                    }),
                                    /*#__PURE__*/ _jsx("div", {
                                        className: `${baseClass}__add-file-wrap`,
                                        children: /*#__PURE__*/ _jsx("button", {
                                            className: `${baseClass}__add-file`,
                                            onClick: handleUrlSubmit,
                                            type: "button",
                                            children: t('upload:addImage')
                                        })
                                    })
                                ]
                            }),
                            /*#__PURE__*/ _jsx(Button, {
                                buttonStyle: "icon-label",
                                className: `${baseClass}__remove`,
                                icon: "x",
                                iconStyle: "with-border",
                                onClick: handleFileRemoval,
                                round: true,
                                tooltip: t('general:cancel')
                            })
                        ]
                    }),
                    value && fileSrc && /*#__PURE__*/ _jsxs(React.Fragment, {
                        children: [
                            /*#__PURE__*/ _jsx("div", {
                                className: `${baseClass}__thumbnail-wrap`,
                                children: /*#__PURE__*/ _jsx(Thumbnail, {
                                    collectionSlug: collectionSlug,
                                    fileSrc: isImage(value.type) ? fileSrc : null
                                })
                            }),
                            /*#__PURE__*/ _jsxs("div", {
                                className: `${baseClass}__file-adjustments`,
                                children: [
                                    /*#__PURE__*/ _jsx("input", {
                                        className: `${baseClass}__filename`,
                                        onChange: handleFileNameChange,
                                        type: "text",
                                        value: value.name
                                    }),
                                    /*#__PURE__*/ _jsx(UploadActions, {
                                        customActions: customActions,
                                        enableAdjustments: showCrop || showFocalPoint,
                                        enablePreviewSizes: hasImageSizes && doc.filename && !replacingFile,
                                        mimeType: value.type
                                    })
                                ]
                            }),
                            /*#__PURE__*/ _jsx(Button, {
                                buttonStyle: "icon-label",
                                className: `${baseClass}__remove`,
                                icon: "x",
                                iconStyle: "with-border",
                                onClick: handleFileRemoval,
                                round: true,
                                tooltip: t('general:cancel')
                            })
                        ]
                    })
                ]
            }),
            (value || doc.filename) && /*#__PURE__*/ _jsx(Drawer, {
                Header: null,
                slug: editDrawerSlug,
                children: /*#__PURE__*/ _jsx(EditUpload, {
                    fileName: value?.name || doc?.filename,
                    fileSrc: doc?.url || fileSrc,
                    imageCacheTag: doc.updatedAt,
                    initialCrop: formQueryParams?.uploadEdits?.crop ?? {},
                    initialFocalPoint: {
                        x: formQueryParams?.uploadEdits?.focalPoint.x || doc.focalX || 50,
                        y: formQueryParams?.uploadEdits?.focalPoint.y || doc.focalY || 50
                    },
                    onSave: onEditsSave,
                    showCrop: showCrop,
                    showFocalPoint: showFocalPoint
                })
            }),
            doc && hasImageSizes && /*#__PURE__*/ _jsx(Drawer, {
                className: `${baseClass}__previewDrawer`,
                hoverTitle: true,
                slug: sizePreviewSlug,
                title: t('upload:sizesFor', {
                    label: doc?.filename
                }),
                children: /*#__PURE__*/ _jsx(PreviewSizes, {
                    doc: doc,
                    imageCacheTag: doc.updatedAt,
                    uploadConfig: uploadConfig
                })
            })
        ]
    });
};

//# sourceMappingURL=index.js.map