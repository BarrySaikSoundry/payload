'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import { isNumber } from 'payload/shared';
import React, { useCallback, useEffect, useState } from 'react';
import { ReactSelect } from '../../elements/ReactSelect/index.js';
import { useFieldProps } from '../../forms/FieldPropsProvider/index.js';
import { useField } from '../../forms/useField/index.js';
import { withCondition } from '../../forms/withCondition/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { FieldDescription } from '../FieldDescription/index.js';
import { FieldError } from '../FieldError/index.js';
import { FieldLabel } from '../FieldLabel/index.js';
import { fieldBaseClass } from '../shared/index.js';
import './index.scss';
const _NumberField = (props)=>{
    const { name, AfterInput, BeforeInput, CustomDescription, CustomError, CustomLabel, className, descriptionProps, errorProps, hasMany = false, label, labelProps, max = Infinity, maxRows = Infinity, min = -Infinity, onChange: onChangeFromProps, path: pathFromProps, placeholder, readOnly: readOnlyFromProps, required, step = 1, style, validate, width } = props;
    const { i18n, t } = useTranslation();
    const memoizedValidate = useCallback((value, options)=>{
        if (typeof validate === 'function') {
            return validate(value, {
                ...options,
                max,
                min,
                required
            });
        }
    }, [
        validate,
        min,
        max,
        required
    ]);
    const { path: pathFromContext, readOnly: readOnlyFromContext } = useFieldProps();
    const { formInitializing, formProcessing, path, setValue, showError, value } = useField({
        path: pathFromContext ?? pathFromProps ?? name,
        validate: memoizedValidate
    });
    const disabled = readOnlyFromProps || readOnlyFromContext || formProcessing || formInitializing;
    const handleChange = useCallback((e)=>{
        const val = parseFloat(e.target.value);
        let newVal = val;
        if (Number.isNaN(val)) {
            newVal = undefined;
        }
        if (typeof onChangeFromProps === 'function') {
            onChangeFromProps(newVal);
        }
        setValue(newVal);
    }, [
        onChangeFromProps,
        setValue
    ]);
    const [valueToRender, setValueToRender] = useState([]) // Only for hasMany
    ;
    const handleHasManyChange = useCallback((selectedOption)=>{
        if (!disabled) {
            let newValue;
            if (!selectedOption) {
                newValue = [];
            } else if (Array.isArray(selectedOption)) {
                newValue = selectedOption.map((option)=>Number(option.value?.value || option.value));
            } else {
                newValue = [
                    Number(selectedOption.value?.value || selectedOption.value)
                ];
            }
            setValue(newValue);
        }
    }, [
        disabled,
        setValue
    ]);
    // useEffect update valueToRender:
    useEffect(()=>{
        if (hasMany && Array.isArray(value)) {
            setValueToRender(value.map((val, index)=>{
                return {
                    id: `${val}${index}`,
                    label: `${val}`,
                    value: {
                        toString: ()=>`${val}${index}`,
                        value: val?.value || val
                    }
                };
            }));
        }
    }, [
        value,
        hasMany
    ]);
    return /*#__PURE__*/ _jsxs("div", {
        className: [
            fieldBaseClass,
            'number',
            className,
            showError && 'error',
            disabled && 'read-only',
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
                        disabled: disabled,
                        filterOption: (_, rawInput)=>{
                            const isOverHasMany = Array.isArray(value) && value.length >= maxRows;
                            return isNumber(rawInput) && !isOverHasMany;
                        },
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
                        // numberOnly
                        onChange: handleHasManyChange,
                        options: [],
                        placeholder: t('general:enterAValue'),
                        showError: showError,
                        value: valueToRender
                    }) : /*#__PURE__*/ _jsxs("div", {
                        children: [
                            BeforeInput,
                            /*#__PURE__*/ _jsx("input", {
                                disabled: disabled,
                                id: `field-${path.replace(/\./g, '__')}`,
                                max: max,
                                min: min,
                                name: path,
                                onChange: handleChange,
                                onWheel: (e)=>{
                                    // @ts-expect-error
                                    e.target.blur();
                                },
                                placeholder: getTranslation(placeholder, i18n),
                                step: step,
                                type: "number",
                                value: typeof value === 'number' ? value : ''
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
export const NumberField = withCondition(_NumberField);

//# sourceMappingURL=index.js.map