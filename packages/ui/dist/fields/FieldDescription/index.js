'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import React from 'react';
import { useFieldProps } from '../../forms/FieldPropsProvider/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import './index.scss';
const baseClass = 'field-description';
const DefaultFieldDescription = (props)=>{
    const { className, description, marginPlacement } = props;
    const { path } = useFieldProps();
    const { i18n } = useTranslation();
    if (description) {
        return /*#__PURE__*/ _jsx("div", {
            className: [
                baseClass,
                className,
                `field-description-${path.replace(/\./g, '__')}`,
                marginPlacement && `${baseClass}--margin-${marginPlacement}`
            ].filter(Boolean).join(' '),
            children: getTranslation(description, i18n)
        });
    }
    return null;
};
export const FieldDescription = (props)=>{
    const { CustomDescription } = props;
    if (CustomDescription !== undefined) {
        return CustomDescription;
    }
    return /*#__PURE__*/ _jsx(DefaultFieldDescription, {
        ...props
    });
};

//# sourceMappingURL=index.js.map