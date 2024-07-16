'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import React, { useCallback } from 'react';
import { useFieldProps } from '../../forms/FieldPropsProvider/index.js';
import { useField } from '../../forms/useField/index.js';
import { withCondition } from '../../forms/withCondition/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { FieldDescription } from '../FieldDescription/index.js';
import { FieldError } from '../FieldError/index.js';
import { FieldLabel } from '../FieldLabel/index.js';
import { fieldBaseClass } from '../shared/index.js';
import './index.scss';
const _EmailField = (props)=>{
    const { name, AfterInput, BeforeInput, CustomDescription, CustomError, CustomLabel, autoComplete, className, descriptionProps, errorProps, label, labelProps, path: pathFromProps, placeholder, readOnly: readOnlyFromProps, required, style, validate, width } = props;
    const { i18n } = useTranslation();
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
    const { path: pathFromContext, readOnly: readOnlyFromContext } = useFieldProps();
    const { formInitializing, formProcessing, path, setValue, showError, value } = useField({
        path: pathFromContext ?? pathFromProps ?? name,
        validate: memoizedValidate
    });
    const disabled = readOnlyFromProps || readOnlyFromContext || formProcessing || formInitializing;
    return /*#__PURE__*/ _jsxs("div", {
        className: [
            fieldBaseClass,
            'email',
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
                    BeforeInput,
                    /*#__PURE__*/ _jsx("input", {
                        autoComplete: autoComplete,
                        disabled: disabled,
                        id: `field-${path.replace(/\./g, '__')}`,
                        name: path,
                        onChange: setValue,
                        placeholder: getTranslation(placeholder, i18n),
                        type: "email",
                        value: value || ''
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
export const EmailField = withCondition(_EmailField);

//# sourceMappingURL=index.js.map