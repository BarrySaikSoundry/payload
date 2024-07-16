'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { useTranslation } from '../../../../providers/Translation/index.js';
import './index.scss';
const baseClass = 'condition-value-number';
export const NumberField = ({ disabled, onChange, value })=>{
    const { t } = useTranslation();
    return /*#__PURE__*/ _jsx("input", {
        className: baseClass,
        disabled: disabled,
        onChange: (e)=>onChange(e.target.value),
        placeholder: t('general:enterAValue'),
        type: "number",
        value: value
    });
};

//# sourceMappingURL=index.js.map