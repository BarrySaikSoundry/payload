'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React, { useCallback } from 'react';
import { useForm, useFormModified } from '../../forms/Form/context.js';
import { FormSubmit } from '../../forms/Submit/index.js';
import { useHotkey } from '../../hooks/useHotkey.js';
import { useDocumentInfo } from '../../providers/DocumentInfo/index.js';
import { useEditDepth } from '../../providers/EditDepth/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
export const DefaultPublishButton = ({ label: labelProp })=>{
    const { hasPublishPermission, publishedDoc, unpublishedVersions } = useDocumentInfo();
    const { submit } = useForm();
    const modified = useFormModified();
    const editDepth = useEditDepth();
    const { t } = useTranslation();
    const label = labelProp || t('version:publishChanges');
    const hasNewerVersions = unpublishedVersions?.totalDocs > 0;
    const canPublish = hasPublishPermission && (modified || hasNewerVersions || !publishedDoc);
    useHotkey({
        cmdCtrlKey: true,
        editDepth,
        keyCodes: [
            's'
        ]
    }, (e)=>{
        e.preventDefault();
        e.stopPropagation();
        if (submit) {
            void submit();
        }
    });
    const publish = useCallback(()=>{
        void submit({
            overrides: {
                _status: 'published'
            }
        });
    }, [
        submit
    ]);
    if (!hasPublishPermission) return null;
    return /*#__PURE__*/ _jsx(FormSubmit, {
        buttonId: "action-save",
        disabled: !canPublish,
        onClick: publish,
        size: "small",
        type: "button",
        children: label
    });
};
export const PublishButton = ({ CustomComponent })=>{
    if (CustomComponent) return CustomComponent;
    return /*#__PURE__*/ _jsx(DefaultPublishButton, {});
};

//# sourceMappingURL=index.js.map