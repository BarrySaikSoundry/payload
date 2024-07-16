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
export const TextInput = (props)=>{
    const { AfterInput, BeforeInput, CustomDescription, CustomError, CustomLabel, className, descriptionProps, errorProps, hasMany, inputRef, label, labelProps, maxRows, onChange, onKeyDown, path, placeholder, readOnly, required, rtl, showError, style, value, valueToRender, width } = props;
    const { i18n, t } = useTranslation();
    return /*#__PURE__*/ _jsxs("div", {
        className: [
            fieldBaseClass,
            'text',
            className,
            showError && 'error',
            readOnly && 'read-only',
            hasMany && 'has-many'
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
                    hasMany ? /*#__PURE__*/ _jsx(ReactSelect, {
                        className: `field-${path.replace(/\./g, '__')}`,
                        disabled: readOnly,
                        // prevent adding additional options if maxRows is reached
                        filterOption: ()=>!maxRows ? true : !(Array.isArray(value) && maxRows && value.length >= maxRows),
                        isClearable: true,
                        isCreatable: true,
                        isMulti: true,
                        isSortable: true,
                        noOptionsMessage: ()=>{
                            const isOverHasMany = Array.isArray(value) && value.length >= maxRows;
                            if (isOverHasMany) {
                                return t('validation:limitReached', {
                                    max: maxRows,
                                    value: value.length + 1
                                });
                            }
                            return null;
                        },
                        onChange: onChange,
                        options: [],
                        placeholder: t('general:enterAValue'),
                        showError: showError,
                        value: valueToRender
                    }) : /*#__PURE__*/ _jsxs("div", {
                        children: [
                            BeforeInput,
                            /*#__PURE__*/ _jsx("input", {
                                "data-rtl": rtl,
                                disabled: readOnly,
                                id: `field-${path?.replace(/\./g, '__')}`,
                                name: path,
                                onChange: onChange,
                                onKeyDown: onKeyDown,
                                placeholder: getTranslation(placeholder, i18n),
                                ref: inputRef,
                                type: "text",
                                value: value || ''
                            }),
                            AfterInput
                        ]
                    }),
                    CustomDescription !== undefined ? CustomDescription : /*#__PURE__*/ _jsx(FieldDescription, {
                        ...descriptionProps || {}
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=Input.js.map