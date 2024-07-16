'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from 'react';
import { RenderCustomClientComponent } from '../../../elements/RenderCustomClientComponent/index.js';
import { useDebounce } from '../../../hooks/useDebounce.js';
import { Button } from '../../Button/index.js';
import { ReactSelect } from '../../ReactSelect/index.js';
import { DateField } from './Date/index.js';
import { NumberField } from './Number/index.js';
import { RelationshipField } from './Relationship/index.js';
import { Select } from './Select/index.js';
import Text from './Text/index.js';
import './index.scss';
const valueFields = {
    Date: DateField,
    Number: NumberField,
    Relationship: RelationshipField,
    Select,
    Text
};
const baseClass = 'condition';
export const Condition = (props)=>{
    const { addCondition, andIndex, fieldName, fields, initialValue, operator, orIndex, removeCondition, updateCondition } = props;
    const [internalField, setInternalField] = useState(()=>fields.find((field)=>fieldName === field.value));
    const [internalOperatorOption, setInternalOperatorOption] = useState(operator);
    const [internalQueryValue, setInternalQueryValue] = useState(initialValue);
    const debouncedValue = useDebounce(internalQueryValue, 300);
    useEffect(()=>{
        // This is to trigger changes when the debounced value changes
        if ((internalField?.value || typeof internalField?.value === 'number') && internalOperatorOption && ![
            null,
            undefined
        ].includes(debouncedValue)) {
            updateCondition({
                andIndex,
                fieldName: internalField.value,
                operator: internalOperatorOption,
                orIndex,
                value: debouncedValue
            });
        }
    }, [
        debouncedValue,
        andIndex,
        internalField?.value,
        internalOperatorOption,
        orIndex,
        updateCondition,
        operator
    ]);
    const booleanSelect = [
        'exists'
    ].includes(internalOperatorOption) || internalField?.props?.type === 'checkbox';
    const ValueComponent = booleanSelect ? Select : valueFields[internalField?.component] || valueFields.Text;
    let valueOptions;
    if (booleanSelect) {
        valueOptions = [
            'true',
            'false'
        ];
    } else if (internalField?.props && 'options' in internalField.props) {
        valueOptions = internalField.props.options;
    }
    return /*#__PURE__*/ _jsx("div", {
        className: baseClass,
        children: /*#__PURE__*/ _jsxs("div", {
            className: `${baseClass}__wrap`,
            children: [
                /*#__PURE__*/ _jsxs("div", {
                    className: `${baseClass}__inputs`,
                    children: [
                        /*#__PURE__*/ _jsx("div", {
                            className: `${baseClass}__field`,
                            children: /*#__PURE__*/ _jsx(ReactSelect, {
                                isClearable: false,
                                onChange: (field)=>{
                                    setInternalField(fields.find((f)=>f.value === field.value));
                                    setInternalOperatorOption(undefined);
                                    setInternalQueryValue(undefined);
                                },
                                options: fields,
                                value: fields.find((field)=>internalField?.value === field.value) || fields[0]
                            })
                        }),
                        /*#__PURE__*/ _jsx("div", {
                            className: `${baseClass}__operator`,
                            children: /*#__PURE__*/ _jsx(ReactSelect, {
                                disabled: !internalField?.value && typeof internalField?.value !== 'number',
                                isClearable: false,
                                onChange: (operator)=>{
                                    setInternalOperatorOption(operator.value);
                                },
                                options: internalField?.operators,
                                value: internalField?.operators.find((operator)=>internalOperatorOption === operator.value) || null
                            })
                        }),
                        /*#__PURE__*/ _jsx("div", {
                            className: `${baseClass}__value`,
                            children: /*#__PURE__*/ _jsx(RenderCustomClientComponent, {
                                CustomComponent: internalField?.props?.admin?.components?.Filter,
                                DefaultComponent: ValueComponent,
                                componentProps: {
                                    ...internalField?.props,
                                    disabled: !internalOperatorOption,
                                    onChange: setInternalQueryValue,
                                    operator: internalOperatorOption,
                                    options: valueOptions,
                                    relationTo: internalField?.props?.type === 'relationship' && 'cellComponentProps' in internalField.props && typeof internalField.props.cellComponentProps === 'object' && 'relationTo' in internalField.props.cellComponentProps ? internalField.props.cellComponentProps?.relationTo : undefined,
                                    value: internalQueryValue ?? ''
                                }
                            })
                        })
                    ]
                }),
                /*#__PURE__*/ _jsxs("div", {
                    className: `${baseClass}__actions`,
                    children: [
                        /*#__PURE__*/ _jsx(Button, {
                            buttonStyle: "icon-label",
                            className: `${baseClass}__actions-remove`,
                            icon: "x",
                            iconStyle: "with-border",
                            onClick: ()=>removeCondition({
                                    andIndex,
                                    orIndex
                                }),
                            round: true
                        }),
                        /*#__PURE__*/ _jsx(Button, {
                            buttonStyle: "icon-label",
                            className: `${baseClass}__actions-add`,
                            icon: "plus",
                            iconStyle: "with-border",
                            onClick: ()=>addCondition({
                                    andIndex: andIndex + 1,
                                    fieldName: fields[0].value,
                                    orIndex,
                                    relation: 'and'
                                }),
                            round: true
                        })
                    ]
                })
            ]
        })
    });
};

//# sourceMappingURL=index.js.map