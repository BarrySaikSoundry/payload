'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import React, { useCallback } from 'react';
import { DatePickerField } from '../../elements/DatePicker/index.js';
import { useField } from '../../forms/useField/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { FieldLabel } from '../FieldLabel/index.js';
import { fieldBaseClass } from '../shared/index.js';
import './index.scss';
const baseClass = 'date-time-field';
import { useFieldProps } from '../../forms/FieldPropsProvider/index.js';
import { withCondition } from '../../forms/withCondition/index.js';
import { FieldDescription } from '../FieldDescription/index.js';
import { FieldError } from '../FieldError/index.js';
const _DateTimeField = (props)=>{
    const { name, AfterInput, BeforeInput, CustomDescription, CustomError, CustomLabel, className, date: datePickerProps, descriptionProps, errorProps, label, labelProps, path: pathFromProps, placeholder, readOnly: readOnlyFromProps, required, style, validate, width } = props;
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
            baseClass,
            className,
            showError && `${baseClass}--has-error`,
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
                id: `field-${path.replace(/\./g, '__')}`,
                children: [
                    /*#__PURE__*/ _jsx(FieldError, {
                        CustomError: CustomError,
                        path: path,
                        ...errorProps || {}
                    }),
                    BeforeInput,
                    /*#__PURE__*/ _jsx(DatePickerField, {
                        ...datePickerProps,
                        onChange: (incomingDate)=>{
                            if (!disabled) setValue(incomingDate?.toISOString() || null);
                        },
                        placeholder: getTranslation(placeholder, i18n),
                        readOnly: disabled,
                        value: value
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
export const DateTimeField = withCondition(_DateTimeField);

//# sourceMappingURL=index.js.map