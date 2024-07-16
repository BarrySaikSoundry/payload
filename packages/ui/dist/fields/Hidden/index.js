'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React, { useEffect } from 'react';
import { useFieldProps } from '../../forms/FieldPropsProvider/index.js';
import { useField } from '../../forms/useField/index.js';
import { withCondition } from '../../forms/withCondition/index.js';
/**
 * This is mainly used to save a value on the form that is not visible to the user.
 * For example, this sets the `ìd` property of a block in the Blocks field.
 */ const _HiddenField = (props)=>{
    const { name, disableModifyingForm = true, forceUsePathFromProps, path: pathFromProps, value: valueFromProps } = props;
    const { path: pathFromContext } = useFieldProps();
    const { path, setValue, value } = useField({
        path: (!forceUsePathFromProps ? pathFromContext : null) || pathFromProps || name
    });
    useEffect(()=>{
        if (valueFromProps !== undefined) {
            setValue(valueFromProps, disableModifyingForm);
        }
    }, [
        valueFromProps,
        setValue,
        disableModifyingForm
    ]);
    return /*#__PURE__*/ _jsx("input", {
        id: `field-${path?.replace(/\./g, '__')}`,
        name: path,
        onChange: setValue,
        type: "hidden",
        value: value || ''
    });
};
export const HiddenField = withCondition(_HiddenField);

//# sourceMappingURL=index.js.map