'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import React, { Fragment } from 'react';
import { useCollapsible } from '../../elements/Collapsible/provider.js';
import { ErrorPill } from '../../elements/ErrorPill/index.js';
import { useFieldProps } from '../../forms/FieldPropsProvider/index.js';
import { useFormInitializing, useFormProcessing, useFormSubmitted } from '../../forms/Form/context.js';
import { RenderFields } from '../../forms/RenderFields/index.js';
import { useField } from '../../forms/useField/index.js';
import { withCondition } from '../../forms/withCondition/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { FieldDescription } from '../FieldDescription/index.js';
import { useRow } from '../Row/provider.js';
import { useTabs } from '../Tabs/provider.js';
import { fieldBaseClass } from '../shared/index.js';
import './index.scss';
import { GroupProvider, useGroup } from './provider.js';
const baseClass = 'group-field';
export const _GroupField = (props)=>{
    const { CustomDescription, CustomLabel, className, descriptionProps, fieldMap, hideGutter, label, readOnly: readOnlyFromProps, style, width } = props;
    const { path, permissions, readOnly: readOnlyFromContext, schemaPath } = useFieldProps();
    const { i18n } = useTranslation();
    const { isWithinCollapsible } = useCollapsible();
    const isWithinGroup = useGroup();
    const isWithinRow = useRow();
    const isWithinTab = useTabs();
    const { errorPaths } = useField({
        path
    });
    const formInitializing = useFormInitializing();
    const formProcessing = useFormProcessing();
    const submitted = useFormSubmitted();
    const errorCount = errorPaths.length;
    const fieldHasErrors = submitted && errorCount > 0;
    const disabled = readOnlyFromProps || readOnlyFromContext || formProcessing || formInitializing;
    const isTopLevel = !(isWithinCollapsible || isWithinGroup || isWithinRow);
    return /*#__PURE__*/ _jsx(Fragment, {
        children: /*#__PURE__*/ _jsx("div", {
            className: [
                fieldBaseClass,
                baseClass,
                isTopLevel && `${baseClass}--top-level`,
                isWithinCollapsible && `${baseClass}--within-collapsible`,
                isWithinGroup && `${baseClass}--within-group`,
                isWithinRow && `${baseClass}--within-row`,
                isWithinTab && `${baseClass}--within-tab`,
                !hideGutter && isWithinGroup && `${baseClass}--gutter`,
                fieldHasErrors && `${baseClass}--has-error`,
                className
            ].filter(Boolean).join(' '),
            id: `field-${path?.replace(/\./g, '__')}`,
            style: {
                ...style,
                width
            },
            children: /*#__PURE__*/ _jsx(GroupProvider, {
                children: /*#__PURE__*/ _jsxs("div", {
                    className: `${baseClass}__wrap`,
                    children: [
                        /*#__PURE__*/ _jsxs("div", {
                            className: `${baseClass}__header`,
                            children: [
                                (CustomLabel || CustomDescription || label) && /*#__PURE__*/ _jsxs("header", {
                                    children: [
                                        CustomLabel !== undefined ? CustomLabel : label ? /*#__PURE__*/ _jsx("h3", {
                                            className: `${baseClass}__title`,
                                            children: getTranslation(label, i18n)
                                        }) : null,
                                        CustomDescription !== undefined ? CustomDescription : /*#__PURE__*/ _jsx(FieldDescription, {
                                            ...descriptionProps || {}
                                        })
                                    ]
                                }),
                                fieldHasErrors && /*#__PURE__*/ _jsx(ErrorPill, {
                                    count: errorCount,
                                    i18n: i18n,
                                    withMessage: true
                                })
                            ]
                        }),
                        /*#__PURE__*/ _jsx(RenderFields, {
                            fieldMap: fieldMap,
                            margins: "small",
                            path: path,
                            permissions: permissions?.fields,
                            readOnly: disabled,
                            schemaPath: schemaPath
                        })
                    ]
                })
            })
        })
    });
};
export { GroupProvider, useGroup };
export const GroupField = withCondition(_GroupField);

//# sourceMappingURL=index.js.map