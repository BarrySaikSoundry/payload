'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { useConfig } from '../../../../../providers/Config/index.js';
import { useTranslation } from '../../../../../providers/Translation/index.js';
import { formatDate } from '../../../../../utilities/formatDate.js';
export const DateCell = ({ cellData, dateDisplayFormat })=>{
    const { admin: { dateFormat: dateFormatFromConfig } } = useConfig();
    const { i18n } = useTranslation();
    const dateFormat = dateDisplayFormat || dateFormatFromConfig;
    return /*#__PURE__*/ _jsx("span", {
        children: cellData && formatDate({
            date: cellData,
            i18n,
            pattern: dateFormat
        })
    });
};

//# sourceMappingURL=index.js.map