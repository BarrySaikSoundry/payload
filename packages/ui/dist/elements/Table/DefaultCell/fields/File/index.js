'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Thumbnail } from '../../../../Thumbnail/index.js';
import './index.scss';
const baseClass = 'file';
export const FileCell = ({ cellData: filename, customCellContext, rowData })=>{
    const { collectionSlug, uploadConfig } = customCellContext;
    return /*#__PURE__*/ _jsxs("div", {
        className: baseClass,
        children: [
            /*#__PURE__*/ _jsx(Thumbnail, {
                className: `${baseClass}__thumbnail`,
                collectionSlug: collectionSlug,
                doc: {
                    ...rowData,
                    filename
                },
                fileSrc: rowData?.thumbnailURL || rowData?.url,
                size: "small",
                uploadConfig: uploadConfig
            }),
            /*#__PURE__*/ _jsx("span", {
                className: `${baseClass}__filename`,
                children: String(filename)
            })
        ]
    });
};

//# sourceMappingURL=index.js.map