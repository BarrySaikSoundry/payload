'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { Fragment, useState } from 'react';
import { FieldLabel } from '../../fields/FieldLabel/index.js';
import { useForm } from '../../forms/Form/context.js';
import { createNestedClientFieldPath } from '../../forms/Form/createNestedFieldPath.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { ReactSelect } from '../ReactSelect/index.js';
import './index.scss';
const baseClass = 'field-select';
export const combineLabel = ({ customLabel, field, prefix })=>{
    const CustomLabelToRender = field && 'CustomLabel' in field.fieldComponentProps && field.fieldComponentProps.CustomLabel !== undefined ? field.fieldComponentProps.CustomLabel : null;
    const DefaultLabelToRender = field && 'label' in field.fieldComponentProps && field.fieldComponentProps.label ? /*#__PURE__*/ _jsx(FieldLabel, {
        label: field.fieldComponentProps.label,
        ...field.fieldComponentProps.labelProps || {}
    }) : null;
    const LabelToRender = CustomLabelToRender || DefaultLabelToRender || customLabel;
    if (!LabelToRender) return null;
    return /*#__PURE__*/ _jsxs(Fragment, {
        children: [
            prefix && /*#__PURE__*/ _jsxs(Fragment, {
                children: [
                    /*#__PURE__*/ _jsx("span", {
                        style: {
                            display: 'inline-block'
                        },
                        children: prefix
                    }),
                    ' > '
                ]
            }),
            /*#__PURE__*/ _jsx("span", {
                style: {
                    display: 'inline-block'
                },
                children: LabelToRender
            })
        ]
    });
};
const reduceFields = ({ fieldMap, labelPrefix = null, path = '' })=>{
    if (!fieldMap) {
        return [];
    }
    return fieldMap?.reduce((fieldsToUse, field)=>{
        const { isFieldAffectingData } = field;
        // escape for a variety of reasons
        if (isFieldAffectingData && (field.disableBulkEdit || field.unique || field.isHidden || 'readOnly' in field.fieldComponentProps && field.fieldComponentProps.readOnly)) {
            return fieldsToUse;
        }
        if (!(field.type === 'array' || field.type === 'blocks') && 'fieldMap' in field.fieldComponentProps) {
            return [
                ...fieldsToUse,
                ...reduceFields({
                    fieldMap: field.fieldComponentProps.fieldMap,
                    labelPrefix: combineLabel({
                        field,
                        prefix: labelPrefix
                    }),
                    path: createNestedClientFieldPath(path, field)
                })
            ];
        }
        if (field.type === 'tabs' && 'tabs' in field.fieldComponentProps) {
            return [
                ...fieldsToUse,
                ...field.fieldComponentProps.tabs.reduce((tabFields, tab)=>{
                    if ('fieldMap' in tab) {
                        const isNamedTab = 'name' in tab && tab.name;
                        return [
                            ...tabFields,
                            ...reduceFields({
                                fieldMap: tab.fieldMap,
                                labelPrefix,
                                path: isNamedTab ? createNestedClientFieldPath(path, field) : path
                            })
                        ];
                    }
                }, [])
            ];
        }
        const formattedField = {
            label: combineLabel({
                field,
                prefix: labelPrefix
            }),
            value: {
                ...field,
                path: createNestedClientFieldPath(path, field)
            }
        };
        return [
            ...fieldsToUse,
            formattedField
        ];
    }, []);
};
export const FieldSelect = ({ fieldMap, setSelected })=>{
    const { t } = useTranslation();
    const [options] = useState(()=>reduceFields({
            fieldMap
        }));
    const { dispatchFields, getFields } = useForm();
    const handleChange = (selected)=>{
        const activeFields = getFields();
        if (selected === null) {
            setSelected([]);
        } else {
            setSelected(selected.map(({ value })=>value));
        }
        // remove deselected values from form state
        if (selected === null || Object.keys(activeFields || []).length > selected.length) {
            Object.keys(activeFields).forEach((path)=>{
                if (selected === null || !selected.find((field)=>{
                    return field.value.path === path;
                })) {
                    dispatchFields({
                        type: 'REMOVE',
                        path
                    });
                }
            });
        }
    };
    return /*#__PURE__*/ _jsxs("div", {
        className: baseClass,
        children: [
            /*#__PURE__*/ _jsx(FieldLabel, {
                label: t('fields:selectFieldsToEdit')
            }),
            /*#__PURE__*/ _jsx(ReactSelect, {
                getOptionValue: (option)=>{
                    if (typeof option.value === 'object' && 'path' in option.value) {
                        return String(option.value.path);
                    }
                    return String(option.value);
                },
                isMulti: true,
                onChange: handleChange,
                options: options
            })
        ]
    });
};

//# sourceMappingURL=index.js.map