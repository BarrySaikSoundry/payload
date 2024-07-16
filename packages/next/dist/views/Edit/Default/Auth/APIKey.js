'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CopyToClipboard, FieldLabel, GenerateConfirmation, useConfig, useField, useFormFields, useTranslation } from '@payloadcms/ui';
import { text } from 'payload/shared';
import React, { useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
const path = 'apiKey';
const baseClass = 'api-key';
const fieldBaseClass = 'field-type';
export const APIKey = ({ enabled, readOnly })=>{
    const [initialAPIKey] = useState(uuidv4());
    const [highlightedField, setHighlightedField] = useState(false);
    const { t } = useTranslation();
    const config = useConfig();
    const apiKey = useFormFields(([fields])=>fields && fields[path] || null);
    const validate = (val)=>text(val, {
            name: 'apiKey',
            type: 'text',
            data: {},
            maxLength: 48,
            minLength: 24,
            preferences: {
                fields: {}
            },
            req: {
                payload: {
                    config
                },
                t
            },
            siblingData: {}
        });
    const apiKeyValue = apiKey?.value;
    const APIKeyLabel = useMemo(()=>/*#__PURE__*/ _jsxs("div", {
            className: `${baseClass}__label`,
            children: [
                /*#__PURE__*/ _jsx("span", {
                    children: "API Key"
                }),
                /*#__PURE__*/ _jsx(CopyToClipboard, {
                    value: apiKeyValue
                })
            ]
        }), [
        apiKeyValue
    ]);
    const fieldType = useField({
        path: 'apiKey',
        validate
    });
    const highlightField = ()=>{
        if (highlightedField) {
            setHighlightedField(false);
        }
        setTimeout(()=>{
            setHighlightedField(true);
        }, 1);
    };
    const { setValue, value } = fieldType;
    useEffect(()=>{
        if (!apiKeyValue && enabled) {
            setValue(initialAPIKey);
        }
        if (!enabled) {
            setValue(null);
        }
    }, [
        apiKeyValue,
        enabled,
        setValue,
        initialAPIKey
    ]);
    useEffect(()=>{
        if (highlightedField) {
            setTimeout(()=>{
                setHighlightedField(false);
            }, 10000);
        }
    }, [
        highlightedField
    ]);
    if (!enabled) {
        return null;
    }
    return /*#__PURE__*/ _jsxs(React.Fragment, {
        children: [
            /*#__PURE__*/ _jsxs("div", {
                className: [
                    fieldBaseClass,
                    'api-key',
                    'read-only'
                ].filter(Boolean).join(' '),
                children: [
                    /*#__PURE__*/ _jsx(FieldLabel, {
                        CustomLabel: APIKeyLabel,
                        htmlFor: path
                    }),
                    /*#__PURE__*/ _jsx("input", {
                        className: highlightedField ? 'highlight' : undefined,
                        disabled: true,
                        id: "apiKey",
                        name: "apiKey",
                        type: "text",
                        value: value || ''
                    })
                ]
            }),
            !readOnly && /*#__PURE__*/ _jsx(GenerateConfirmation, {
                highlightField: highlightField,
                setKey: ()=>setValue(uuidv4())
            })
        ]
    });
};

//# sourceMappingURL=APIKey.js.map