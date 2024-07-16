'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Pill, useTableCell, useTranslation } from '@payloadcms/ui';
import React, { Fragment } from 'react';
export const renderPill = (data, latestVersion, currentLabel, previousLabel, pillStyle)=>{
    return /*#__PURE__*/ _jsxs(React.Fragment, {
        children: [
            data?.id === latestVersion ? /*#__PURE__*/ _jsx(Pill, {
                pillStyle: pillStyle,
                children: currentLabel
            }) : /*#__PURE__*/ _jsx(Pill, {
                children: previousLabel
            }),
            "  "
        ]
    });
};
export const AutosaveCell = ({ latestDraftVersion, latestPublishedVersion })=>{
    const { t } = useTranslation();
    const { rowData } = useTableCell();
    const status = rowData?.version._status;
    const versionInfo = {
        draft: {
            currentLabel: t('version:currentDraft'),
            latestVersion: latestDraftVersion,
            pillStyle: undefined,
            previousLabel: t('version:draft')
        },
        published: {
            currentLabel: t('version:currentPublishedVersion'),
            latestVersion: latestPublishedVersion,
            pillStyle: 'success',
            previousLabel: t('version:previouslyPublished')
        }
    };
    const { currentLabel, latestVersion, pillStyle, previousLabel } = versionInfo[status] || {};
    return /*#__PURE__*/ _jsxs(Fragment, {
        children: [
            rowData?.autosave && /*#__PURE__*/ _jsxs(React.Fragment, {
                children: [
                    /*#__PURE__*/ _jsx(Pill, {
                        children: t('version:autosave')
                    }),
                    "  "
                ]
            }),
            status && renderPill(rowData, latestVersion, currentLabel, previousLabel, pillStyle)
        ]
    });
};

//# sourceMappingURL=index.js.map