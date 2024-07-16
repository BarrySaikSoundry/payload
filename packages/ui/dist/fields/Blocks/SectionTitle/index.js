'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { useField } from '../../../forms/useField/index.js';
import { useTranslation } from '../../../providers/Translation/index.js';
import './index.scss';
const baseClass = 'section-title';
/**
 * An input field representing the block's `blockName` property - responsible for reading and saving the `blockName`
 * property from/into the provided path.
 */ export const SectionTitle = (props)=>{
    const { customOnChange, customValue, path, readOnly } = props;
    const { setValue, value } = useField({
        path
    });
    const { t } = useTranslation();
    const classes = [
        baseClass
    ].filter(Boolean).join(' ');
    const onChange = customOnChange || ((e)=>{
        e.stopPropagation();
        e.preventDefault();
        setValue(e.target.value);
    });
    return /*#__PURE__*/ _jsx("div", {
        className: classes,
        "data-value": customValue || value,
        children: /*#__PURE__*/ _jsx("input", {
            className: `${baseClass}__input`,
            id: path,
            name: path,
            onChange: onChange,
            placeholder: t('general:untitled'),
            readOnly: readOnly,
            type: "text",
            value: customValue || value || ''
        })
    });
};

//# sourceMappingURL=index.js.map