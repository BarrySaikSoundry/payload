'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import React from 'react';
import { Collapsible } from '../../elements/Collapsible/index.js';
import { ErrorPill } from '../../elements/ErrorPill/index.js';
import { Pill } from '../../elements/Pill/index.js';
import { useFormSubmitted } from '../../forms/Form/context.js';
import { RenderFields } from '../../forms/RenderFields/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { RowActions } from './RowActions.js';
import { SectionTitle } from './SectionTitle/index.js';
const baseClass = 'blocks-field';
export const BlockRow = ({ addRow, attributes, block, blocks, duplicateRow, errorCount, forceRender, hasMaxRows, isSortable, labels, listeners, moveRow, path: parentPath, permissions, readOnly, removeRow, row, rowCount, rowIndex, schemaPath, setCollapse, setNodeRef, transform })=>{
    const path = `${parentPath}.${rowIndex}`;
    const { i18n } = useTranslation();
    const hasSubmitted = useFormSubmitted();
    const fieldHasErrors = hasSubmitted && errorCount > 0;
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
            actions: !readOnly ? /*#__PURE__*/ _jsx(RowActions, {
                addRow: addRow,
                blockType: row.blockType,
                blocks: blocks,
                duplicateRow: duplicateRow,
                fieldMap: block.fieldMap,
                hasMaxRows: hasMaxRows,
                isSortable: isSortable,
                labels: labels,
                moveRow: moveRow,
                removeRow: removeRow,
                rowCount: rowCount,
                rowIndex: rowIndex
            }) : undefined,
            className: classNames,
            collapsibleStyle: fieldHasErrors ? 'error' : 'default',
            dragHandleProps: isSortable ? {
                id: row.id,
                attributes,
                listeners
            } : undefined,
            header: /*#__PURE__*/ _jsxs("div", {
                className: `${baseClass}__block-header`,
                children: [
                    /*#__PURE__*/ _jsx("span", {
                        className: `${baseClass}__block-number`,
                        children: String(rowIndex + 1).padStart(2, '0')
                    }),
                    /*#__PURE__*/ _jsx(Pill, {
                        className: `${baseClass}__block-pill ${baseClass}__block-pill-${row.blockType}`,
                        pillStyle: "white",
                        children: getTranslation(block.labels.singular, i18n)
                    }),
                    /*#__PURE__*/ _jsx(SectionTitle, {
                        path: `${path}.blockName`,
                        readOnly: readOnly
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
                fieldMap: block.fieldMap,
                forceRender: forceRender,
                margins: "small",
                path: path,
                permissions: permissions?.blocks?.[block.slug]?.fields,
                readOnly: readOnly,
                schemaPath: `${schemaPath}.${block.slug}`
            })
        }, row.id)
    }, `${parentPath}-row-${rowIndex}`);
};

//# sourceMappingURL=BlockRow.js.map