import { jsx as _jsx } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import React from 'react';
import { RowLabelProvider } from '../RowLabel/Context/index.js';
const baseClass = 'row-label';
export const RowLabel = (props)=>{
    const { RowLabelComponent, className, i18n, path, rowLabel, rowNumber } = props;
    if (RowLabelComponent) {
        return /*#__PURE__*/ _jsx(RowLabelProvider, {
            path: path,
            rowNumber: rowNumber,
            children: RowLabelComponent
        });
    }
    const label = rowLabel ? typeof rowLabel === 'object' ? getTranslation(rowLabel, i18n) : typeof rowLabel === 'string' ? rowLabel : '' : '';
    return /*#__PURE__*/ _jsx("span", {
        className: [
            baseClass,
            className
        ].filter(Boolean).join(' '),
        style: {
            pointerEvents: 'none'
        },
        children: label
    });
};

//# sourceMappingURL=index.js.map