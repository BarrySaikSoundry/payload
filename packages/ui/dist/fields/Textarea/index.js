'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import React, { useCallback } from 'react';
import { useFieldProps } from '../../forms/FieldPropsProvider/index.js';
import { useField } from '../../forms/useField/index.js';
import { withCondition } from '../../forms/withCondition/index.js';
import { useConfig } from '../../providers/Config/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { isFieldRTL } from '../shared/index.js';
import { TextareaInput } from './Input.js';
import './index.scss';
export { TextareaInput };
const _TextareaField = (props)=>{
    const { name, AfterInput, BeforeInput, CustomDescription, CustomError, CustomLabel, className, descriptionProps, errorProps, label, labelProps, locale, localized, maxLength, minLength, path: pathFromProps, placeholder, readOnly: readOnlyFromProps, required, rows, rtl, style, validate, width } = props;
    const { i18n } = useTranslation();
    const { localization } = useConfig();
    const isRTL = isFieldRTL({
        fieldLocalized: localized,
        fieldRTL: rtl,
        locale,
        localizationConfig: localization || undefined
    });
    const memoizedValidate = useCallback((value, options)=>{
        if (typeof validate === 'function') return validate(value, {
            ...options,
            maxLength,
            minLength,
            required
        });
    }, [
        validate,
        required,
        maxLength,
        minLength
    ]);
    const { path: pathFromContext, readOnly: readOnlyFromContext } = useFieldProps();
    const { formInitializing, formProcessing, path, setValue, showError, value } = useField({
        path: pathFromContext ?? pathFromProps ?? name,
        validate: memoizedValidate
    });
    const disabled = readOnlyFromProps || readOnlyFromContext || formProcessing || formInitializing;
    return /*#__PURE__*/ _jsx(TextareaInput, {
        AfterInput: AfterInput,
        BeforeInput: BeforeInput,
        CustomDescription: CustomDescription,
        CustomError: CustomError,
        CustomLabel: CustomLabel,
        className: className,
        descriptionProps: descriptionProps,
        errorProps: errorProps,
        label: label,
        labelProps: labelProps,
        onChange: (e)=>{
            setValue(e.target.value);
        },
        path: path,
        placeholder: getTranslation(placeholder, i18n),
        readOnly: disabled,
        required: required,
        rows: rows,
        rtl: isRTL,
        showError: showError,
        style: style,
        value: value,
        width: width
    });
};
export const TextareaField = withCondition(_TextareaField);

//# sourceMappingURL=index.js.map