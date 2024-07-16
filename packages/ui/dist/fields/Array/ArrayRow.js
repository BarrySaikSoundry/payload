'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import React from 'react';
import { ArrayAction } from '../../elements/ArrayAction/index.js';
import { Collapsible } from '../../elements/Collapsible/index.js';
import { ErrorPill } from '../../elements/ErrorPill/index.js';
import { useFormSubmitted } from '../../forms/Form/context.js';
import { RenderFields } from '../../forms/RenderFields/index.js';
import { RowLabel } from '../../forms/RowLabel/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import './index.scss';
const baseClass = 'array-field';
export const ArrayRow = ({ CustomRowLabel, addRow, attributes, duplicateRow, errorCount, fieldMap, forceRender = false, hasMaxRows, indexPath, isSortable, labels, listeners, moveRow, path: parentPath, permissions, readOnly, removeRow, row, rowCount, rowIndex, schemaPath, setCollapse, setNodeRef, transform })=>{
    const path = `${parentPath}.${rowIndex}`;
    const { i18n } = useTranslation();
    const hasSubmitted = useFormSubmitted();
    const fallbackLabel = `${getTranslation(labels.singular, i18n)} ${String(rowIndex + 1).padStart(2, '0')}`;
    const fieldHasErrors = errorCount > 0 && hasSubmitted;
    const classNames = [
        `${baseClass}__row`,
        fieldHasErrors ? `${baseClass}__row--has-errors` : `${baseClass}__row--no-errors`
    ].filter(Boolean).join(' ');
    return /*#__PURE__*/ _jsx("div", {
        id: `${parentPath.split('.').join('-')}-row-${rowIndex}`,
        ref: setNodeRef,
        style: {
            transform
        },
        children: /*#__PURE__*/ _jsx(Collapsible, {
            actions: !readOnly ? /*#__PURE__*/ _jsx(ArrayAction, {
                addRow: addRow,
                duplicateRow: duplicateRow,
                hasMaxRows: hasMaxRows,
                index: rowIndex,
                isSortable: isSortable,
                moveRow: moveRow,
                removeRow: removeRow,
                rowCount: rowCount
            }) : undefined,
            className: classNames,
            collapsibleStyle: fieldHasErrors ? 'error' : 'default',
            dragHandleProps: isSortable ? {
                id: row.id,
                attributes,
                listeners
            } : undefined,
            header: /*#__PURE__*/ _jsxs("div", {
                className: `${baseClass}__row-header`,
                children: [
                    /*#__PURE__*/ _jsx(RowLabel, {
                        RowLabelComponent: CustomRowLabel,
                        i18n: i18n,
                        path: path,
                        rowLabel: fallbackLabel,
                        rowNumber: rowIndex + 1
                    }),
                    fieldHasErrors && /*#__PURE__*/ _jsx(ErrorPill, {
                        count: errorCount,
                        i18n: i18n,
                        withMessage: true
                    })
                ]
            }),
            isCollapsed: row.collapsed,
            onToggle: (collapsed)=>setCollapse(row.id, collapsed),
            children: /*#__PURE__*/ _jsx(RenderFields, {
                className: `${baseClass}__fields`,
                fieldMap: fieldMap,
                forceRender: forceRender,
                indexPath: indexPath,
                margins: "small",
                path: path,
                permissions: permissions?.fields,
                readOnly: readOnly,
                schemaPath: schemaPath
            })
        })
    }, `${parentPath}-row-${row.id}`);
};

//# sourceMappingURL=ArrayRow.js.map