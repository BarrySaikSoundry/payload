'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import React from 'react';
import { useTranslation } from '../../providers/Translation/index.js';
import './index.scss';
export function isComponent(description) {
    return /*#__PURE__*/ React.isValidElement(description);
}
export const ViewDescription = (props)=>{
    const { i18n } = useTranslation();
    const { description } = props;
    if (isComponent(description)) {
        const Description = description;
        return /*#__PURE__*/ _jsx(Description, {});
    }
    if (description) {
        return /*#__PURE__*/ _jsx("div", {
            className: "view-description",
            children: typeof description === 'function' ? description() : getTranslation(description, i18n)
        });
    }
    return null;
};

//# sourceMappingURL=index.js.map