'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import React, { useCallback } from 'react';
import { useField } from '../../forms/useField/index.js';
import { withCondition } from '../../forms/withCondition/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { fieldBaseClass } from '../shared/index.js';
import './index.scss';
const baseClass = 'point';
import { useFieldProps } from '../../forms/FieldPropsProvider/index.js';
import { FieldDescription } from '../FieldDescription/index.js';
import { FieldError } from '../FieldError/index.js';
import { FieldLabel } from '../FieldLabel/index.js';
export const _PointField = (props)=>{
    const { name, AfterInput, BeforeInput, CustomDescription, CustomError, CustomLabel, className, descriptionProps, errorProps, label, labelProps, path: pathFromProps, placeholder, readOnly: readOnlyFromProps, required, step, style, validate, width } = props;
    const { i18n, t } = useTranslation();
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
    const readOnly = readOnlyFromProps || readOnlyFromContext;
    const { path, setValue, showError, value = [
        null,
        null
    ] } = useField({
        path: pathFromContext ?? pathFromProps ?? name,
        validate: memoizedValidate
    });
    const handleChange = useCallback((e, index)=>{
        let val = parseFloat(e.target.value);
        if (Number.isNaN(val)) {
            val = e.target.value;
        }
        const coordinates = [
            ...value
        ];
        coordinates[index] = val;
        setValue(coordinates);
    }, [
        setValue,
        value
    ]);
    const getCoordinateFieldLabel = (type)=>{
        const suffix = type === 'longitude' ? t('fields:longitude') : t('fields:latitude');
        const fieldLabel = label ? getTranslation(label, i18n) : '';
        return {
            ...labelProps,
            label: `${fieldLabel}${fieldLabel ? ' - ' : ''}${suffix}`
        };
    };
    return /*#__PURE__*/ _jsxs("div", {
        className: [
            fieldBaseClass,
            baseClass,
            className,
            showError && 'error',
            readOnly && 'read-only'
        ].filter(Boolean).join(' '),
        style: {
            ...style,
            width
        },
        children: [
            /*#__PURE__*/ _jsxs("ul", {
                className: `${baseClass}__wrap`,
                children: [
                    /*#__PURE__*/ _jsxs("li", {
                        children: [
                            CustomLabel !== undefined ? CustomLabel : /*#__PURE__*/ _jsx(FieldLabel, {
                                ...getCoordinateFieldLabel('longitude')
                            }),
                            /*#__PURE__*/ _jsxs("div", {
                                className: "input-wrapper",
                                children: [
                                    BeforeInput,
                                    /*#__PURE__*/ _jsx("input", {
                                        disabled: readOnly,
                                        id: `field-longitude-${path.replace(/\./g, '__')}`,
                                        name: `${path}.longitude`,
                                        onChange: (e)=>handleChange(e, 0),
                                        placeholder: getTranslation(placeholder, i18n),
                                        step: step,
                                        type: "number",
                                        value: value && typeof value[0] === 'number' ? value[0] : ''
                                    }),
                                    AfterInput
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsxs("li", {
                        children: [
                            CustomLabel !== undefined ? CustomLabel : /*#__PURE__*/ _jsx(FieldLabel, {
                                ...getCoordinateFieldLabel('latitude')
                            }),
                            /*#__PURE__*/ _jsxs("div", {
                                className: "input-wrapper",
                                children: [
                                    /*#__PURE__*/ _jsx(FieldError, {
                                        CustomError: CustomError,
                                        path: path,
                                        ...errorProps || {}
                                    }),
                                    BeforeInput,
                                    /*#__PURE__*/ _jsx("input", {
                                        disabled: readOnly,
                                        id: `field-latitude-${path.replace(/\./g, '__')}`,
                                        name: `${path}.latitude`,
                                        onChange: (e)=>handleChange(e, 1),
                                        placeholder: getTranslation(placeholder, i18n),
                                        step: step,
                                        type: "number",
                                        value: value && typeof value[1] === 'number' ? value[1] : ''
                                    }),
                                    AfterInput
                                ]
                            })
                        ]
                    })
                ]
            }),
            CustomDescription !== undefined ? CustomDescription : /*#__PURE__*/ _jsx(FieldDescription, {
                ...descriptionProps || {}
            })
        ]
    });
};
export const PointField = withCondition(_PointField);

//# sourceMappingURL=index.js.map