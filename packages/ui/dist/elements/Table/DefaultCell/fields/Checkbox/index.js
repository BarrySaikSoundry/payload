'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { useTranslation } from '../../../../../providers/Translation/index.js';
import './index.scss';
export const CheckboxCell = ({ cellData })=>{
    const { t } = useTranslation();
    return /*#__PURE__*/ _jsx("code", {
        className: "bool-cell",
        children: /*#__PURE__*/ _jsx("span", {
            children: t(`general:${cellData}`).toLowerCase()
        })
    });
};

//# sourceMappingURL=index.js.map