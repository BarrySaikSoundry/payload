'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useCallback } from 'react';
import { CodeEditor } from '../../elements/CodeEditor/index.js';
import { useFieldProps } from '../../forms/FieldPropsProvider/index.js';
import { useField } from '../../forms/useField/index.js';
import { withCondition } from '../../forms/withCondition/index.js';
import { FieldDescription } from '../FieldDescription/index.js';
import { FieldError } from '../FieldError/index.js';
import { FieldLabel } from '../FieldLabel/index.js';
import { fieldBaseClass } from '../shared/index.js';
import './index.scss';
const prismToMonacoLanguageMap = {
    js: 'javascript',
    ts: 'typescript'
};
const baseClass = 'code-field';
const _CodeField = (props)=>{
    const { name, AfterInput, BeforeInput, CustomDescription, CustomError, CustomLabel, className, descriptionProps, editorOptions = {}, errorProps, label, labelProps, language = 'javascript', path: pathFromProps, readOnly: readOnlyFromProps, required, style, validate, width } = props;
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
                    /*#__PURE__*/ _jsx(CodeEditor, {
                        defaultLanguage: prismToMonacoLanguageMap[language] || language,
                        onChange: disabled ? ()=>null : (val)=>setValue(val),
                        options: editorOptions,
                        readOnly: disabled,
                        value: value || ''
                    }),
                    AfterInput
                ]
            }),
            CustomDescription ? CustomDescription : /*#__PURE__*/ _jsx(FieldDescription, {
                ...descriptionProps || {}
            })
        ]
    });
};
export const CodeField = withCondition(_CodeField);

//# sourceMappingURL=index.js.map