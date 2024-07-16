'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useCallback } from 'react';
import { useField } from '../../forms/useField/index.js';
import { withCondition } from '../../forms/withCondition/index.js';
import { FieldError } from '../FieldError/index.js';
import { FieldLabel } from '../FieldLabel/index.js';
import { fieldBaseClass } from '../shared/index.js';
import './index.scss';
const _PasswordField = (props)=>{
    const { name, CustomError, CustomLabel, autoComplete, className, disabled: disabledFromProps, errorProps, label, labelProps, path: pathFromProps, required, style, validate, width } = props;
    const memoizedValidate = useCallback((value, options)=>{
        if (typeof validate === 'function') {
            return validate(value, {
                ...options,
                required
            });
        }
    }, [
        validate,
        required
    ]);
    const { formInitializing, formProcessing, path, setValue, showError, value } = useField({
        path: pathFromProps || name,
        validate: memoizedValidate
    });
    const disabled = disabledFromProps || formInitializing || formProcessing;
    return /*#__PURE__*/ _jsxs("div", {
        className: [
            fieldBaseClass,
            'password',
            className,
            showError && 'error',
            disabled && 'read-only'
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
                    /*#__PURE__*/ _jsx("input", {
                        autoComplete: autoComplete,
                        disabled: disabled,
                        id: `field-${path.replace(/\./g, '__')}`,
                        name: path,
                        onChange: setValue,
                        type: "password",
                        value: value || ''
                    })
                ]
            })
        ]
    });
};
export const PasswordField = withCondition(_PasswordField);

//# sourceMappingURL=index.js.map