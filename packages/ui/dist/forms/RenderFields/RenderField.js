'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { HiddenField } from '../../fields/Hidden/index.js';
import { useFieldComponents } from '../../providers/FieldComponents/index.js';
import { useOperation } from '../../providers/Operation/index.js';
import { FieldPropsProvider, useFieldProps } from '../FieldPropsProvider/index.js';
export const RenderField = ({ name, type, CustomField, custom, disabled, fieldComponentProps, indexPath, isHidden, path: pathFromProps, permissions, readOnly: readOnlyFromProps, schemaPath: schemaPathFromProps, siblingPermissions })=>{
    const operation = useOperation();
    const { readOnly: readOnlyFromContext } = useFieldProps();
    const fieldComponents = useFieldComponents();
    const path = [
        pathFromProps,
        name
    ].filter(Boolean).join('.');
    const schemaPath = [
        schemaPathFromProps,
        name
    ].filter(Boolean).join('.');
    // if the user cannot read the field, then filter it out
    // this is different from `admin.readOnly` which is executed based on `operation`
    if (permissions?.read?.permission === false || disabled) {
        return null;
    }
    // `admin.readOnly` displays the value but prevents the field from being edited
    let readOnly = readOnlyFromProps;
    // if parent field is `readOnly: true`, but this field is `readOnly: false`, the field should still be editable
    if (readOnlyFromContext && readOnly !== false) readOnly = true;
    // if the user does not have access control to begin with, force it to be read-only
    if (permissions?.[operation]?.permission === false) {
        readOnly = true;
    }
    const DefaultField = isHidden ? HiddenField : fieldComponents[type];
    if (CustomField === undefined && !DefaultField) {
        return null;
    }
    return /*#__PURE__*/ _jsx(FieldPropsProvider, {
        custom: custom,
        indexPath: indexPath,
        path: path,
        permissions: permissions,
        readOnly: readOnly,
        schemaPath: schemaPath,
        siblingPermissions: siblingPermissions,
        type: type,
        children: CustomField !== undefined ? CustomField : /*#__PURE__*/ _jsx(DefaultField, {
            ...fieldComponentProps
        })
    });
};

//# sourceMappingURL=RenderField.js.map