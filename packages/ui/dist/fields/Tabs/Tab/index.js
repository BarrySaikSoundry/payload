'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import React, { useState } from 'react';
import { ErrorPill } from '../../../elements/ErrorPill/index.js';
import { WatchChildErrors } from '../../../forms/WatchChildErrors/index.js';
import { useTranslation } from '../../../providers/Translation/index.js';
import './index.scss';
const baseClass = 'tabs-field__tab-button';
export const TabComponent = ({ isActive, parentPath, setIsActive, tab })=>{
    const { name, label } = tab;
    const { i18n } = useTranslation();
    const [errorCount, setErrorCount] = useState(undefined);
    const hasName = 'name' in tab;
    const path = `${parentPath ? `${parentPath}.` : ''}${'name' in tab ? name : ''}`;
    const fieldHasErrors = errorCount > 0;
    return /*#__PURE__*/ _jsxs(React.Fragment, {
        children: [
            /*#__PURE__*/ _jsx(WatchChildErrors, {
                fieldMap: tab.fieldMap,
                path: path,
                setErrorCount: setErrorCount
            }),
            /*#__PURE__*/ _jsxs("button", {
                className: [
                    baseClass,
                    fieldHasErrors && `${baseClass}--has-error`,
                    isActive && `${baseClass}--active`
                ].filter(Boolean).join(' '),
                onClick: setIsActive,
                type: "button",
                children: [
                    label ? getTranslation(label, i18n) : hasName && name,
                    fieldHasErrors && /*#__PURE__*/ _jsx(ErrorPill, {
                        count: errorCount,
                        i18n: i18n
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=index.js.map