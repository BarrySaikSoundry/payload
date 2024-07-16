'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { useFieldProps } from '../../forms/FieldPropsProvider/index.js';
import { RenderFields } from '../../forms/RenderFields/index.js';
import { withCondition } from '../../forms/withCondition/index.js';
import { fieldBaseClass } from '../shared/index.js';
import './index.scss';
import { RowProvider, useRow } from './provider.js';
export { RowProvider, useRow };
const baseClass = 'row';
export const _RowField = (props)=>{
    const { className, fieldMap, forceRender = false } = props;
    const { indexPath, path, readOnly, schemaPath, siblingPermissions } = useFieldProps();
    return /*#__PURE__*/ _jsx(RowProvider, {
        children: /*#__PURE__*/ _jsx("div", {
            className: [
                fieldBaseClass,
                baseClass,
                className
            ].filter(Boolean).join(' '),
            children: /*#__PURE__*/ _jsx(RenderFields, {
                fieldMap,
                forceRender,
                path,
                readOnly,
                schemaPath,
                className: `${baseClass}__fields`,
                fieldMap: fieldMap,
                forceRender: forceRender,
                indexPath: indexPath,
                margins: false,
                permissions: siblingPermissions
            })
        })
    });
};
export const RowField = withCondition(_RowField);

//# sourceMappingURL=index.js.map