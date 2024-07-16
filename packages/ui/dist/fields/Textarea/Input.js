'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import React from 'react';
import { useTranslation } from '../../providers/Translation/index.js';
import { FieldDescription } from '../FieldDescription/index.js';
import { FieldError } from '../FieldError/index.js';
import { FieldLabel } from '../FieldLabel/index.js';
import { fieldBaseClass } from '../shared/index.js';
import './index.scss';
export const TextareaInput = (props)=>{
    const { AfterInput, BeforeInput, CustomDescription, CustomError, CustomLabel, className, descriptionProps, errorProps, label, labelProps, onChange, path, placeholder, readOnly, required, rows, rtl, showError, style, value, width } = props;
    const { i18n } = useTranslation();
    return /*#__PURE__*/ _jsxs("div", {
        className: [
            fieldBaseClass,
            'textarea',
            className,
            showError && 'error',
            readOnly && 'read-only'
        ].filter(Boolean).join(' '),
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
                    /*#__PURE__*/ _jsx("label", {
                        className: "textarea-outer",
                        htmlFor: `field-${path.replace(/\./g, '__')}`,
                        children: /*#__PURE__*/ _jsxs("div", {
                            className: "textarea-inner",
                            children: [
                                /*#__PURE__*/ _jsx("div", {
                                    className: "textarea-clone",
                                    "data-value": value || placeholder || ''
                                }),
                                /*#__PURE__*/ _jsx("textarea", {
                                    className: "textarea-element",
                                    "data-rtl": rtl,
                                    disabled: readOnly,
                                    id: `field-${path.replace(/\./g, '__')}`,
                                    name: path,
                                    onChange: onChange,
                                    placeholder: getTranslation(placeholder, i18n),
                                    rows: rows,
                                    value: value || ''
                                })
                            ]
                        })
                    }),
                    AfterInput,
                    CustomDescription !== undefined ? CustomDescription : /*#__PURE__*/ _jsx(FieldDescription, {
                        ...descriptionProps || {}
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=Input.js.map