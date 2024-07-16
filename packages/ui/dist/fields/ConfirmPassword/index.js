'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useCallback } from 'react';
import { useFormFields } from '../../forms/Form/context.js';
import { useField } from '../../forms/useField/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { FieldError } from '../FieldError/index.js';
import { FieldLabel } from '../FieldLabel/index.js';
import { fieldBaseClass } from '../shared/index.js';
import './index.scss';
export const ConfirmPasswordField = (props)=>{
    const { disabled } = props;
    const password = useFormFields(([fields])=>fields?.password);
    const { t } = useTranslation();
    const validate = useCallback((value)=>{
        if (!value) {
            return t('validation:required');
        }
        if (value === password?.value) {
            return true;
        }
        return t('fields:passwordsDoNotMatch');
    }, [
        password,
        t
    ]);
    const path = 'confirm-password';
    const { setValue, showError, value } = useField({
        disableFormData: true,
        path,
        validate
    });
    return /*#__PURE__*/ _jsxs("div", {
        className: [
            fieldBaseClass,
            'confirm-password',
            showError && 'error'
        ].filter(Boolean).join(' '),
        children: [
            /*#__PURE__*/ _jsx(FieldLabel, {
                htmlFor: "field-confirm-password",
                label: t('authentication:confirmPassword'),
                required: true
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: `${fieldBaseClass}__wrap`,
                children: [
                    /*#__PURE__*/ _jsx(FieldError, {
                        path: path
                    }),
                    /*#__PURE__*/ _jsx("input", {
                        autoComplete: "off",
                        disabled: !!disabled,
                        id: "field-confirm-password",
                        name: "confirm-password",
                        onChange: setValue,
                        type: "password",
                        value: value || ''
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=index.js.map