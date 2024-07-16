'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React, { forwardRef } from 'react';
import { Button } from '../../elements/Button/index.js';
import { useForm, useFormInitializing, useFormProcessing } from '../Form/context.js';
import './index.scss';
const baseClass = 'form-submit';
export const FormSubmit = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { type = 'submit', buttonId: id, children, disabled: disabledFromProps } = props;
    const processing = useFormProcessing();
    const initializing = useFormInitializing();
    const { disabled } = useForm();
    const canSave = !(disabledFromProps || initializing || processing || disabled);
    return /*#__PURE__*/ _jsx("div", {
        className: baseClass,
        children: /*#__PURE__*/ _jsx(Button, {
            ref: ref,
            ...props,
            disabled: canSave ? undefined : true,
            id: id,
            type: type,
            children: children
        })
    });
});

//# sourceMappingURL=index.js.map