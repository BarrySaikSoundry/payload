'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { SelectField, useForm } from '@payloadcms/ui';
import React, { useEffect, useState } from 'react';
export const DynamicFieldSelector = (props)=>{
    const { fields, getDataByPath } = useForm();
    const [options, setOptions] = useState([]);
    useEffect(()=>{
        const fields = getDataByPath('fields');
        if (fields) {
            const allNonPaymentFields = fields.map((block)=>{
                const { name, blockType, label } = block;
                if (blockType !== 'payment') {
                    return {
                        label,
                        value: name
                    };
                }
                return null;
            }).filter(Boolean);
            setOptions(allNonPaymentFields);
        }
    }, [
        fields,
        getDataByPath
    ]);
    // TODO: label from config is Record<string, string> | false | string
    //  but the FormFieldBase type has only label?: string, changing FormFieldBase breaks other ui components
    return /*#__PURE__*/ _jsx(SelectField, {
        ...props,
        options: options
    });
};

//# sourceMappingURL=DynamicFieldSelector.js.map