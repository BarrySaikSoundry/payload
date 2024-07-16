'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { CheckIcon } from '../../icons/Check/index.js';
import { LineIcon } from '../../icons/Line/index.js';
import { FieldLabel } from '../FieldLabel/index.js';
export const inputBaseClass = 'checkbox-input';
export const CheckboxInput = ({ id, name, AfterInput, BeforeInput, CustomLabel, checked, className, inputRef, label, labelProps, onToggle, partialChecked, readOnly, required })=>{
    return /*#__PURE__*/ _jsxs("div", {
        className: [
            className,
            inputBaseClass,
            checked && `${inputBaseClass}--checked`,
            readOnly && `${inputBaseClass}--read-only`
        ].filter(Boolean).join(' '),
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: `${inputBaseClass}__input`,
                children: [
                    BeforeInput,
                    /*#__PURE__*/ _jsx("input", {
                        "aria-label": "",
                        defaultChecked: Boolean(checked),
                        disabled: readOnly,
                        id: id,
                        name: name,
                        onInput: onToggle,
                        ref: inputRef,
                        required: required,
                        type: "checkbox"
                    }),
                    /*#__PURE__*/ _jsxs("span", {
                        className: [
                            `${inputBaseClass}__icon`,
                            !checked && partialChecked ? 'check' : 'partial'
                        ].filter(Boolean).join(' '),
                        children: [
                            checked && /*#__PURE__*/ _jsx(CheckIcon, {}),
                            !checked && partialChecked && /*#__PURE__*/ _jsx(LineIcon, {})
                        ]
                    }),
                    AfterInput
                ]
            }),
            /*#__PURE__*/ _jsx(FieldLabel, {
                CustomLabel: CustomLabel,
                htmlFor: id,
                label: label,
                required: required,
                ...labelProps || {}
            })
        ]
    });
};

//# sourceMappingURL=Input.js.map