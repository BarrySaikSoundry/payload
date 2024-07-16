import { jsx as _jsx } from "react/jsx-runtime";
import { SortColumn } from '@payloadcms/ui';
import React from 'react';
import { AutosaveCell } from './cells/AutosaveCell/index.js';
import { CreatedAtCell } from './cells/CreatedAt/index.js';
import { IDCell } from './cells/ID/index.js';
export const buildVersionColumns = ({ collectionConfig, docID, globalConfig, i18n: { t }, latestDraftVersion, latestPublishedVersion })=>{
    const entityConfig = collectionConfig || globalConfig;
    const columns = [
        {
            name: '',
            type: 'date',
            Label: '',
            accessor: 'updatedAt',
            active: true,
            components: {
                Cell: /*#__PURE__*/ _jsx(CreatedAtCell, {
                    collectionSlug: collectionConfig?.slug,
                    docID: docID,
                    globalSlug: globalConfig?.slug
                }),
                Heading: /*#__PURE__*/ _jsx(SortColumn, {
                    Label: t('general:updatedAt'),
                    name: "updatedAt"
                })
            }
        },
        {
            name: '',
            type: 'text',
            Label: '',
            accessor: 'id',
            active: true,
            components: {
                Cell: /*#__PURE__*/ _jsx(IDCell, {}),
                Heading: /*#__PURE__*/ _jsx(SortColumn, {
                    Label: t('version:versionID'),
                    disable: true,
                    name: "id"
                })
            }
        }
    ];
    if (entityConfig?.versions?.drafts || entityConfig?.versions?.drafts && entityConfig.versions.drafts?.autosave) {
        columns.push({
            name: '',
            type: 'checkbox',
            Label: '',
            accessor: '_status',
            active: true,
            components: {
                Cell: /*#__PURE__*/ _jsx(AutosaveCell, {
                    latestDraftVersion: latestDraftVersion,
                    latestPublishedVersion: latestPublishedVersion
                }),
                Heading: /*#__PURE__*/ _jsx(SortColumn, {
                    Label: t('version:status'),
                    disable: true,
                    name: "status"
                })
            }
        });
    }
    return columns;
};

//# sourceMappingURL=buildColumns.js.map