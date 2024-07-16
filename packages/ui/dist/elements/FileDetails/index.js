'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { UploadActions } from '../../elements/Upload/index.js';
import { Button } from '../Button/index.js';
import { Thumbnail } from '../Thumbnail/index.js';
import { FileMeta } from './FileMeta/index.js';
import './index.scss';
const baseClass = 'file-details';
export const FileDetails = (props)=>{
    const { collectionSlug, customUploadActions, doc, enableAdjustments, handleRemove, hasImageSizes, imageCacheTag, uploadConfig } = props;
    const { id, filename, filesize, height, mimeType, thumbnailURL, url, width } = doc;
    return /*#__PURE__*/ _jsx("div", {
        className: baseClass,
        children: /*#__PURE__*/ _jsxs("header", {
            children: [
                /*#__PURE__*/ _jsx(Thumbnail, {
                    collectionSlug: collectionSlug,
                    doc: doc,
                    fileSrc: thumbnailURL || url,
                    imageCacheTag: imageCacheTag,
                    uploadConfig: uploadConfig
                }),
                /*#__PURE__*/ _jsxs("div", {
                    className: `${baseClass}__main-detail`,
                    children: [
                        /*#__PURE__*/ _jsx(FileMeta, {
                            collection: collectionSlug,
                            filename: filename,
                            filesize: filesize,
                            height: height,
                            id: id,
                            mimeType: mimeType,
                            url: url,
                            width: width
                        }),
                        /*#__PURE__*/ _jsx(UploadActions, {
                            customActions: customUploadActions,
                            enableAdjustments: enableAdjustments,
                            enablePreviewSizes: hasImageSizes && doc.filename,
                            mimeType: mimeType
                        })
                    ]
                }),
                handleRemove && /*#__PURE__*/ _jsx(Button, {
                    buttonStyle: "icon-label",
                    className: `${baseClass}__remove`,
                    icon: "x",
                    iconStyle: "with-border",
                    onClick: handleRemove,
                    round: true
                })
            ]
        })
    });
};

//# sourceMappingURL=index.js.map