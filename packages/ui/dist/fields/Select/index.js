'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React, { useCallback } from 'react';
import { useFieldProps } from '../../forms/FieldPropsProvider/index.js';
import { useField } from '../../forms/useField/index.js';
import { withCondition } from '../../forms/withCondition/index.js';
import { SelectInput } from './Input.js';
const formatOptions = (options)=>options.map((option)=>{
        if (typeof option === 'object' && (option.value || option.value === '')) {
            return option;
        }
        return {
            label: option,
            value: option
        };
    });
const _SelectField = (props)=>{
    const { name, AfterInput, BeforeInput, CustomDescription, CustomError, CustomLabel, className, descriptionProps, errorProps, hasMany = false, isClearable = true, isSortable = true, label, labelProps, onChange: onChangeFromProps, options: optionsFromProps = [], path: pathFromProps, readOnly: readOnlyFromProps, required, style, validate, width } = props;
    const options = React.useMemo(()=>formatOptions(optionsFromProps), [
        optionsFromProps
    ]);
    const memoizedValidate = useCallback((value, validationOptions)=>{
        if (typeof validate === 'function') return validate(value, {
            ...validationOptions,
            hasMany,
            options,
            required
        });
    }, [
        validate,
        required,
        hasMany,
        options
    ]);
    const { path: pathFromContext, readOnly: readOnlyFromContext } = useFieldProps();
    const { formInitializing, formProcessing, path, setValue, showError, value } = useField({
        path: pathFromContext ?? pathFromProps ?? name,
        validate: memoizedValidate
    });
    const disabled = readOnlyFromProps || readOnlyFromContext || formProcessing || formInitializing;
    const onChange = useCallback((selectedOption)=>{
        if (!disabled) {
            let newValue = null;
            if (selectedOption && hasMany) {
                if (Array.isArray(selectedOption)) {
                    newValue = selectedOption.map((option)=>option.value);
                } else {
                    newValue = [];
                }
            } else if (selectedOption && !Array.isArray(selectedOption)) {
                newValue = selectedOption.value;
            }
            if (typeof onChangeFromProps === 'function') {
                onChangeFromProps(newValue);
            }
            setValue(newValue);
        }
    }, [
        disabled,
        hasMany,
        setValue,
        onChangeFromProps
    ]);
    return /*#__PURE__*/ _jsx(SelectInput, {
        AfterInput: AfterInput,
        BeforeInput: BeforeInput,
        CustomDescription: CustomDescription,
        CustomError: CustomError,
        CustomLabel: CustomLabel,
        className: className,
        descriptionProps: descriptionProps,
        errorProps: errorProps,
        hasMany: hasMany,
        isClearable: isClearable,
        isSortable: isSortable,
        label: label,
        labelProps: labelProps,
        name: name,
        onChange: onChange,
        options: options,
        path: path,
        readOnly: disabled,
        required: required,
        showError: showError,
        style: style,
        value: value,
        width: width
    });
};
export const SelectField = withCondition(_SelectField);
export { SelectInput };

//# sourceMappingURL=index.js.map