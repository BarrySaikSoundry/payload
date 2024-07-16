'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { optionIsObject } from 'payload/shared';
import React, { useCallback } from 'react';
import { useForm } from '../../forms/Form/context.js';
import { useField } from '../../forms/useField/index.js';
import { withCondition } from '../../forms/withCondition/index.js';
import { FieldLabel } from '../FieldLabel/index.js';
import { fieldBaseClass } from '../shared/index.js';
import { Radio } from './Radio/index.js';
import './index.scss';
const baseClass = 'radio-group';
import { useFieldProps } from '../../forms/FieldPropsProvider/index.js';
import { FieldDescription } from '../FieldDescription/index.js';
import { FieldError } from '../FieldError/index.js';
const _RadioGroupField = (props)=>{
    const { name, CustomDescription, CustomError, CustomLabel, className, descriptionProps, errorProps, label, labelProps, layout = 'horizontal', onChange: onChangeFromProps, options = [], path: pathFromProps, readOnly: readOnlyFromProps, required, style, validate, value: valueFromProps, width } = props;
    const { uuid } = useForm();
    const memoizedValidate = useCallback((value, validationOptions)=>{
        if (typeof validate === 'function') return validate(value, {
            ...validationOptions,
            options,
            required
        });
    }, [
        validate,
        options,
        required
    ]);
    const { path: pathFromContext, readOnly: readOnlyFromContext } = useFieldProps();
    const { formInitializing, formProcessing, path, setValue, showError, value: valueFromContext } = useField({
        path: pathFromContext ?? pathFromProps ?? name,
        validate: memoizedValidate
    });
    const disabled = readOnlyFromProps || readOnlyFromContext || formProcessing || formInitializing;
    const value = valueFromContext || valueFromProps;
    return /*#__PURE__*/ _jsxs("div", {
        className: [
            fieldBaseClass,
            baseClass,
            className,
            `${baseClass}--layout-${layout}`,
            showError && 'error',
            disabled && `${baseClass}--read-only`
        ].filter(Boolean).join(' '),
        style: {
            ...style,
            width
        },
        children: [
            /*#__PURE__*/ _jsx(FieldError, {
                CustomError: CustomError,
                path: path,
                ...errorProps || {},
                alignCaret: "left"
            }),
            /*#__PURE__*/ _jsx(FieldLabel, {
                CustomLabel: CustomLabel,
                label: label,
                required: required,
                ...labelProps || {}
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: `${fieldBaseClass}__wrap`,
                children: [
                    /*#__PURE__*/ _jsx("ul", {
                        className: `${baseClass}--group`,
                        id: `field-${path.replace(/\./g, '__')}`,
                        children: options.map((option)=>{
                            let optionValue = '';
                            if (optionIsObject(option)) {
                                optionValue = option.value;
                            } else {
                                optionValue = option;
                            }
                            const isSelected = String(optionValue) === String(value);
                            const id = `field-${path}-${optionValue}${uuid ? `-${uuid}` : ''}`;
                            return /*#__PURE__*/ _jsx("li", {
                                children: /*#__PURE__*/ _jsx(Radio, {
                                    id: id,
                                    isSelected: isSelected,
                                    onChange: ()=>{
                                        if (typeof onChangeFromProps === 'function') {
                                            onChangeFromProps(optionValue);
                                        }
                                        if (!disabled) {
                                            setValue(optionValue);
                                        }
                                    },
                                    option: optionIsObject(option) ? option : {
                                        label: option,
                                        value: option
                                    },
                                    path: path,
                                    readOnly: disabled,
                                    uuid: uuid
                                })
                            }, `${path} - ${optionValue}`);
                        })
                    }),
                    CustomDescription !== undefined ? CustomDescription : /*#__PURE__*/ _jsx(FieldDescription, {
                        ...descriptionProps || {}
                    })
                ]
            })
        ]
    });
};
export const RadioGroupField = withCondition(_RadioGroupField);

//# sourceMappingURL=index.js.map