'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FieldDescription, FieldError, FieldLabel, useField, useFieldProps, withCondition } from '@payloadcms/ui';
import React, { useCallback } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { LexicalProvider } from '../lexical/LexicalProvider.js';
import './bundled.css';
const baseClass = 'rich-text-lexical';
const _RichText = (props)=>{
    const { name, CustomDescription, CustomError, CustomLabel, className, descriptionProps, editorConfig, errorProps, label, labelProps, path: pathFromProps, readOnly, required, style, validate, width } = props;
    const memoizedValidate = useCallback((value, validationOptions)=>{
        if (typeof validate === 'function') {
            return validate(value, {
                ...validationOptions,
                props,
                required
            });
        }
    }, // Important: do not add props to the dependencies array.
    // This would cause an infinite loop and endless re-rendering.
    // Removing props from the dependencies array fixed this issue: https://github.com/payloadcms/payload/issues/3709
    [
        validate,
        required
    ]);
    const { path: pathFromContext } = useFieldProps();
    const fieldType = useField({
        path: pathFromContext ?? pathFromProps ?? name,
        validate: memoizedValidate
    });
    const { errorMessage, initialValue, path, schemaPath, setValue, showError, value } = fieldType;
    const classes = [
        baseClass,
        'field-type',
        className,
        showError && 'error',
        readOnly && `${baseClass}--read-only`,
        editorConfig?.admin?.hideGutter !== true ? `${baseClass}--show-gutter` : null
    ].filter(Boolean).join(' ');
    return /*#__PURE__*/ _jsxs("div", {
        className: classes,
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
                className: `${baseClass}__wrap`,
                children: [
                    /*#__PURE__*/ _jsx(ErrorBoundary, {
                        fallbackRender: fallbackRender,
                        onReset: ()=>{},
                        children: /*#__PURE__*/ _jsx(LexicalProvider, {
                            editorConfig: editorConfig,
                            fieldProps: props,
                            onChange: (editorState)=>{
                                let serializedEditorState = editorState.toJSON();
                                // Transform state through save hooks
                                if (editorConfig?.features?.hooks?.save?.length) {
                                    editorConfig.features.hooks.save.forEach((hook)=>{
                                        serializedEditorState = hook({
                                            incomingEditorState: serializedEditorState
                                        });
                                    });
                                }
                                setValue(serializedEditorState);
                            },
                            path: path,
                            readOnly: readOnly,
                            value: value
                        }, JSON.stringify({
                            initialValue,
                            path
                        }))
                    }),
                    CustomDescription !== undefined ? CustomDescription : /*#__PURE__*/ _jsx(FieldDescription, {
                        ...descriptionProps || {}
                    })
                ]
            })
        ]
    }, path);
};
function fallbackRender({ error }) {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.
    return /*#__PURE__*/ _jsxs("div", {
        className: "errorBoundary",
        role: "alert",
        children: [
            /*#__PURE__*/ _jsx("p", {
                children: "Something went wrong:"
            }),
            /*#__PURE__*/ _jsx("pre", {
                style: {
                    color: 'red'
                },
                children: error.message
            })
        ]
    });
}
export const RichText = withCondition(_RichText);

//# sourceMappingURL=Field.js.map