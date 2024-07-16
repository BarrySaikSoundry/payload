'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useDocumentInfo } from '@payloadcms/ui';
import React, { Fragment } from 'react';
import { baseClass } from '../../Tab/index.js';
export const VersionsPill = ()=>{
    const { versions } = useDocumentInfo();
    // To prevent CLS (versions are currently loaded client-side), render non-breaking space if there are no versions
    // The pill is already conditionally rendered to begin with based on whether the document is version-enabled
    // documents that are version enabled _always_ have at least one version
    const hasVersions = versions?.totalDocs > 0;
    return /*#__PURE__*/ _jsx("span", {
        className: [
            `${baseClass}__count`,
            hasVersions ? `${baseClass}__count--has-count` : ''
        ].filter(Boolean).join(' '),
        children: hasVersions ? versions.totalDocs.toString() : /*#__PURE__*/ _jsx(Fragment, {
            children: " "
        })
    });
};

//# sourceMappingURL=index.js.map