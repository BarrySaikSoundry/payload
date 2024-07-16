'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LinkImport from 'next/link.js';
import React from 'react'; // TODO: abstract this out to support all routers
import { getTranslation } from '@payloadcms/translations';
import { useConfig } from '../../../providers/Config/index.js';
import { useTranslation } from '../../../providers/Translation/index.js';
import { useTableCell } from '../TableCellProvider/index.js';
import { CodeCell } from './fields/Code/index.js';
import { cellComponents } from './fields/index.js';
const Link = LinkImport.default || LinkImport;
export const DefaultCell = (props)=>{
    const { name, className: classNameFromProps, fieldType, isFieldAffectingData, label, onClick: onClickFromProps } = props;
    const { i18n } = useTranslation();
    const { routes: { admin: adminRoute } } = useConfig();
    const cellContext = useTableCell();
    const { cellData, cellProps, columnIndex, customCellContext, rowData } = cellContext || {};
    const { className: classNameFromContext, link, onClick: onClickFromContext } = cellProps || {};
    const className = classNameFromProps || classNameFromContext;
    const onClick = onClickFromProps || onClickFromContext;
    let WrapElement = 'span';
    const wrapElementProps = {
        className
    };
    const isLink = link !== undefined ? link : columnIndex === 0;
    if (isLink) {
        WrapElement = Link;
        wrapElementProps.href = customCellContext?.collectionSlug ? `${adminRoute}/collections/${customCellContext?.collectionSlug}/${rowData.id}` : '';
    }
    if (typeof onClick === 'function') {
        WrapElement = 'button';
        wrapElementProps.type = 'button';
        wrapElementProps.onClick = ()=>{
            onClick({
                cellData,
                collectionSlug: customCellContext?.collectionSlug,
                rowData
            });
        };
    }
    if (name === 'id') {
        return /*#__PURE__*/ _jsx(WrapElement, {
            ...wrapElementProps,
            children: /*#__PURE__*/ _jsx(CodeCell, {
                cellData: `ID: ${cellData}`,
                name: name,
                nowrap: true,
                rowData: rowData,
                schemaPath: cellContext?.cellProps?.schemaPath
            })
        });
    }
    const DefaultCellComponent = typeof cellData !== 'undefined' && cellComponents[fieldType];
    let CellComponent = null;
    if (DefaultCellComponent) {
        CellComponent = /*#__PURE__*/ _jsx(DefaultCellComponent, {
            cellData: cellData,
            customCellContext: customCellContext,
            rowData: rowData,
            ...props
        });
    } else if (!DefaultCellComponent) {
        // DefaultCellComponent does not exist for certain field types like `text`
        if (customCellContext.uploadConfig && isFieldAffectingData && name === 'filename') {
            const FileCellComponent = cellComponents.File;
            CellComponent = /*#__PURE__*/ _jsx(FileCellComponent, {
                cellData: cellData,
                customCellContext: customCellContext,
                rowData: rowData,
                ...props
            });
        } else {
            return /*#__PURE__*/ _jsxs(WrapElement, {
                ...wrapElementProps,
                children: [
                    (cellData === '' || typeof cellData === 'undefined') && 'label' in props && i18n.t('general:noLabel', {
                        label: getTranslation(label || 'data', i18n)
                    }),
                    typeof cellData === 'string' && cellData,
                    typeof cellData === 'number' && cellData,
                    typeof cellData === 'object' && JSON.stringify(cellData)
                ]
            });
        }
    }
    return /*#__PURE__*/ _jsx(WrapElement, {
        ...wrapElementProps,
        children: CellComponent
    });
};

//# sourceMappingURL=index.js.map