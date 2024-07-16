'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import React from 'react';
import { useFieldProps } from '../../forms/FieldPropsProvider/index.js';
import { useForm } from '../../forms/Form/context.js';
import { useEditDepth } from '../../providers/EditDepth/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { generateFieldID } from '../../utilities/generateFieldID.js';
import './index.scss';
const DefaultFieldLabel = (props)=>{
    const { as: Element = 'label', htmlFor: htmlForFromProps, label: labelFromProps, required = false, unstyled = false } = props;
    const { uuid } = useForm();
    const { path } = useFieldProps();
    const editDepth = useEditDepth();
    const htmlFor = htmlForFromProps || generateFieldID(path, editDepth, uuid);
    const { i18n } = useTranslation();
    if (labelFromProps) {
        return /*#__PURE__*/ _jsxs(Element, {
            className: `field-label ${unstyled ? 'unstyled' : ''}`,
            htmlFor: htmlFor,
            children: [
                getTranslation(labelFromProps, i18n),
                required && !unstyled && /*#__PURE__*/ _jsx("span", {
                    className: "required",
                    children: "*"
                })
            ]
        });
    }
    return null;
};
export const FieldLabel = (props)=>{
    const { CustomLabel } = props;
    if (CustomLabel !== undefined) {
        return CustomLabel;
    }
    return /*#__PURE__*/ _jsx(DefaultFieldLabel, {
        ...props
    });
};

//# sourceMappingURL=index.js.map