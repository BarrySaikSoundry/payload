'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React, { useRef } from 'react';
import { useForm, useFormModified } from '../../forms/Form/context.js';
import { FormSubmit } from '../../forms/Submit/index.js';
import { useHotkey } from '../../hooks/useHotkey.js';
import { useEditDepth } from '../../providers/EditDepth/index.js';
import { useOperation } from '../../providers/Operation/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
export const DefaultSaveButton = ({ label: labelProp })=>{
    const { t } = useTranslation();
    const { submit } = useForm();
    const modified = useFormModified();
    const label = labelProp || t('general:save');
    const ref = useRef(null);
    const editDepth = useEditDepth();
    const operation = useOperation();
    const forceDisable = operation === 'update' && !modified;
    useHotkey({
        cmdCtrlKey: true,
        editDepth,
        keyCodes: [
            's'
        ]
    }, (e)=>{
        if (forceDisable) {
        // absorb the event
        }
        e.preventDefault();
        e.stopPropagation();
        if (ref?.current) {
            ref.current.click();
        }
    });
    return /*#__PURE__*/ _jsx(FormSubmit, {
        buttonId: "action-save",
        disabled: forceDisable,
        onClick: ()=>submit(),
        ref: ref,
        size: "small",
        type: "button",
        children: label
    });
};
export const SaveButton = ({ CustomComponent })=>{
    if (CustomComponent) return CustomComponent;
    return /*#__PURE__*/ _jsx(DefaultSaveButton, {});
};

//# sourceMappingURL=index.js.map