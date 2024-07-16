'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { formatFilesize } from 'payload/shared';
import React, { useState } from 'react';
import { EditIcon } from '../../../icons/Edit/index.js';
import { CopyToClipboard } from '../../CopyToClipboard/index.js';
import { useDocumentDrawer } from '../../DocumentDrawer/index.js';
import { Tooltip } from '../../Tooltip/index.js';
import './index.scss';
const baseClass = 'file-meta';
export const FileMeta = (props)=>{
    const { id, collection, filename, filesize, height, mimeType, url: fileURL, width } = props;
    const [hovered, setHovered] = useState(false);
    const openInDrawer = Boolean(id && collection);
    const [DocumentDrawer, DocumentDrawerToggler] = useDocumentDrawer({
        id,
        collectionSlug: collection
    });
    return /*#__PURE__*/ _jsxs("div", {
        className: baseClass,
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: `${baseClass}__url`,
                children: [
                    openInDrawer && /*#__PURE__*/ _jsx(DocumentDrawer, {}),
                    /*#__PURE__*/ _jsx("a", {
                        href: fileURL,
                        rel: "noopener noreferrer",
                        target: "_blank",
                        children: filename
                    }),
                    /*#__PURE__*/ _jsx(CopyToClipboard, {
                        defaultMessage: "Copy URL",
                        value: fileURL
                    }),
                    openInDrawer && /*#__PURE__*/ _jsxs(DocumentDrawerToggler, {
                        className: `${baseClass}__edit`,
                        onMouseEnter: ()=>setHovered(true),
                        onMouseLeave: ()=>setHovered(false),
                        children: [
                            /*#__PURE__*/ _jsx(EditIcon, {}),
                            /*#__PURE__*/ _jsx(Tooltip, {
                                show: hovered,
                                children: "Edit"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: `${baseClass}__size-type`,
                children: [
                    formatFilesize(filesize),
                    width && height && /*#__PURE__*/ _jsxs(React.Fragment, {
                        children: [
                            " - ",
                            width,
                            "x",
                            height
                        ]
                    }),
                    mimeType && /*#__PURE__*/ _jsxs(React.Fragment, {
                        children: [
                            " - ",
                            mimeType
                        ]
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=index.js.map