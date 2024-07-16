'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useConfig, useTableCell, useTranslation } from '@payloadcms/ui';
import { formatDate } from '@payloadcms/ui/shared';
import LinkImport from 'next/link.js';
import React from 'react';
const Link = LinkImport.default || LinkImport;
export const CreatedAtCell = ({ collectionSlug, docID, globalSlug })=>{
    const { admin: { dateFormat }, routes: { admin } } = useConfig();
    const { i18n } = useTranslation();
    const { cellData, rowData } = useTableCell();
    const versionID = rowData.id;
    let to;
    if (collectionSlug) to = `${admin}/collections/${collectionSlug}/${docID}/versions/${versionID}`;
    if (globalSlug) to = `${admin}/globals/${globalSlug}/versions/${versionID}`;
    return /*#__PURE__*/ _jsx(Link, {
        href: to,
        children: cellData && formatDate({
            date: cellData,
            i18n,
            pattern: dateFormat
        })
    });
};

//# sourceMappingURL=index.js.map