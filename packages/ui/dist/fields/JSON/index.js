'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useCallback, useEffect, useState } from 'react';
import { CodeEditor } from '../../elements/CodeEditor/index.js';
import { useField } from '../../forms/useField/index.js';
import { withCondition } from '../../forms/withCondition/index.js';
import { FieldLabel } from '../FieldLabel/index.js';
import { fieldBaseClass } from '../shared/index.js';
import './index.scss';
const baseClass = 'json-field';
import { useFieldProps } from '../../forms/FieldPropsProvider/index.js';
import { FieldDescription } from '../FieldDescription/index.js';
import { FieldError } from '../FieldError/index.js';
const _JSONField = (props)=>{
    const { name, AfterInput, BeforeInput, CustomDescription, CustomError, CustomLabel, className, descriptionProps, editorOptions, errorProps, jsonSchema, label, labelProps, path: pathFromProps, readOnly: readOnlyFromProps, required, style, validate, width } = props;
    const [stringValue, setStringValue] = useState();
    const [jsonError, setJsonError] = useState();
    const [hasLoadedValue, setHasLoadedValue] = useState(false);
    const memoizedValidate = useCallback((value, options)=>{
        if (typeof validate === 'function') return validate(value, {
            ...options,
            jsonError,
            required
        });
    }, [
        validate,
        required,
        jsonError
    ]);
    const { path: pathFromContext, readOnly: readOnlyFromContext } = useFieldProps();
    const { formInitializing, formProcessing, initialValue, path, setValue, showError, value } = useField({
        path: pathFromContext ?? pathFromProps ?? name,
        validate: memoizedValidate
    });
    const disabled = readOnlyFromProps || readOnlyFromContext || formProcessing || formInitializing;
    const handleMount = useCallback((editor, monaco)=>{
        if (!jsonSchema) return;
        const existingSchemas = monaco.languages.json.jsonDefaults.diagnosticsOptions.schemas || [];
        const modelUri = monaco.Uri.parse(jsonSchema.uri);
        const model = monaco.editor.createModel(JSON.stringify(value, null, 2), 'json', modelUri);
        monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
            enableSchemaRequest: true,
            schemas: [
                ...existingSchemas,
                jsonSchema
            ],
            validate: true
        });
        editor.setModel(model);
    }, [
        jsonSchema,
        value
    ]);
    const handleChange = useCallback((val)=>{
        if (disabled) return;
        setStringValue(val);
        try {
            setValue(val ? JSON.parse(val) : null);
            setJsonError(undefined);
        } catch (e) {
            setValue(val ? val : null);
            setJsonError(e);
        }
    }, [
        disabled,
        setValue,
        setStringValue
    ]);
    useEffect(()=>{
        if (hasLoadedValue || value === undefined) return;
        setStringValue(value || initialValue ? JSON.stringify(value ? value : initialValue, null, 2) : '');
        setHasLoadedValue(true);
    }, [
        initialValue,
        value,
        hasLoadedValue
    ]);
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
                        defaultLanguage: "json",
                        onChange: handleChange,
                        onMount: handleMount,
                        options: editorOptions,
                        readOnly: disabled,
                        value: stringValue
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
export const JSONField = withCondition(_JSONField);

//# sourceMappingURL=index.js.map