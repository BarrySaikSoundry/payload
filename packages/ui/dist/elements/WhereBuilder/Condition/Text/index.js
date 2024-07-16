'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { useTranslation } from '../../../../providers/Translation/index.js';
import './index.scss';
const baseClass = 'condition-value-text';
const Text = ({ disabled, onChange, value })=>{
    const { t } = useTranslation();
    return /*#__PURE__*/ _jsx("input", {
        className: baseClass,
        disabled: disabled,
        onChange: (e)=>onChange(e.target.value),
        placeholder: t('general:enterAValue'),
        type: "text",
        value: value || ''
    });
};
export default Text;

//# sourceMappingURL=index.js.map