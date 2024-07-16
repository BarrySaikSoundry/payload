'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import React from 'react';
import { ReactSelect } from '../../elements/ReactSelect/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { FieldDescription } from '../FieldDescription/index.js';
import { FieldError } from '../FieldError/index.js';
import { FieldLabel } from '../FieldLabel/index.js';
import { fieldBaseClass } from '../shared/index.js';
import './index.scss';
export const SelectInput = (props)=>{
    const { AfterInput, BeforeInput, CustomDescription, CustomError, CustomLabel, className, descriptionProps, errorProps, hasMany = false, isClearable = true, isSortable = true, label, labelProps, onChange, options, path, readOnly, required, showError, style, value, width } = props;
    const { i18n } = useTranslation();
    let valueToRender;
    if (hasMany && Array.isArray(value)) {
        valueToRender = value.map((val)=>{
            const matchingOption = options.find((option)=>option.value === val);
            return {
                label: matchingOption ? getTranslation(matchingOption.label, i18n) : val,
                value: matchingOption?.value ?? val
            };
        });
    } else if (value) {
        const matchingOption = options.find((option)=>option.value === value);
        valueToRender = {
            label: matchingOption ? getTranslation(matchingOption.label, i18n) : value,
            value: matchingOption?.value ?? value
        };
    }
    return /*#__PURE__*/ _jsxs("div", {
        className: [
            fieldBaseClass,
            'select',
            className,
            showError && 'error',
            readOnly && 'read-only'
        ].filter(Boolean).join(' '),
        id: `field-${path.replace(/\./g, '__')}`,
        style: {
            ...style,
            width
        },
        children: [
            /*#__PURE__*/ _jsx(FieldLabel, {
                CustomLabel: CustomLabel,
                label: label,
                required: required,
                ...labelProps || {}
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: `${fieldBaseClass}__wrap`,
                children: [
                    /*#__PURE__*/ _jsx(FieldError, {
                        CustomError: CustomError,
                        path: path,
                        ...errorProps || {}
                    }),
                    BeforeInput,
                    /*#__PURE__*/ _jsx(ReactSelect, {
                        disabled: readOnly,
                        isClearable: isClearable,
                        isMulti: hasMany,
                        isSortable: isSortable,
                        onChange: onChange,
                        options: options.map((option)=>({
                                ...option,
                                label: getTranslation(option.label, i18n)
                            })),
                        showError: showError,
                        value: valueToRender
                    }),
                    AfterInput
                ]
            }),
            CustomDescription !== undefined ? CustomDescription : /*#__PURE__*/ _jsx(FieldDescription, {
                ...descriptionProps || {}
            })
        ]
    });
};

//# sourceMappingURL=Input.js.map