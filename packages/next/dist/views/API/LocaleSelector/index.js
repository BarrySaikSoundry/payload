import { jsx as _jsx } from "react/jsx-runtime";
import { SelectField, useTranslation } from '@payloadcms/ui';
import React from 'react';
export const LocaleSelector = ({ localeOptions, onChange })=>{
    const { t } = useTranslation();
    return /*#__PURE__*/ _jsx(SelectField, {
        label: t('general:locale'),
        name: "locale",
        onChange: (value)=>onChange(value),
        options: localeOptions,
        path: "locale"
    });
};

//# sourceMappingURL=index.js.map