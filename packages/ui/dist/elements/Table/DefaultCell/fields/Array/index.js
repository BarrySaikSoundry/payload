'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import React from 'react';
import { useTranslation } from '../../../../../providers/Translation/index.js';
export const ArrayCell = ({ cellData, labels })=>{
    const { i18n } = useTranslation();
    const arrayFields = cellData ?? [];
    const label = `${arrayFields.length} ${getTranslation(labels?.plural || i18n.t('general:rows'), i18n)}`;
    return /*#__PURE__*/ _jsx("span", {
        children: label
    });
};

//# sourceMappingURL=index.js.map