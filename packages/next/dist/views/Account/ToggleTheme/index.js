'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { RadioGroupField, useTheme, useTranslation } from '@payloadcms/ui';
import React, { useCallback } from 'react';
export const ToggleTheme = ()=>{
    const { autoMode, setTheme, theme } = useTheme();
    const { t } = useTranslation();
    const onChange = useCallback((newTheme)=>{
        setTheme(newTheme);
    }, [
        setTheme
    ]);
    return /*#__PURE__*/ _jsx(RadioGroupField, {
        label: t('general:adminTheme'),
        name: "theme",
        onChange: onChange,
        options: [
            {
                label: t('general:automatic'),
                value: 'auto'
            },
            {
                label: t('general:light'),
                value: 'light'
            },
            {
                label: t('general:dark'),
                value: 'dark'
            }
        ],
        value: autoMode ? 'auto' : theme
    });
};

//# sourceMappingURL=index.js.map