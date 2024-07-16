'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Modal, useModal } from '@faceless-ui/modal';
import React from 'react';
import { toast } from 'sonner';
import { useDocumentInfo } from '../../providers/DocumentInfo/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { Button } from '../Button/index.js';
import { Translation } from '../Translation/index.js';
import './index.scss';
const baseClass = 'generate-confirmation';
export const GenerateConfirmation = (props)=>{
    const { highlightField, setKey } = props;
    const { id } = useDocumentInfo();
    const { toggleModal } = useModal();
    const { t } = useTranslation();
    const modalSlug = `generate-confirmation-${id}`;
    const handleGenerate = ()=>{
        setKey();
        toggleModal(modalSlug);
        toast.success(t('authentication:newAPIKeyGenerated'));
        highlightField(true);
    };
    return /*#__PURE__*/ _jsxs(React.Fragment, {
        children: [
            /*#__PURE__*/ _jsx(Button, {
                buttonStyle: "secondary",
                onClick: ()=>{
                    toggleModal(modalSlug);
                },
                size: "small",
                children: t('authentication:generateNewAPIKey')
            }),
            /*#__PURE__*/ _jsx(Modal, {
                className: baseClass,
                slug: modalSlug,
                children: /*#__PURE__*/ _jsxs("div", {
                    className: `${baseClass}__template`,
                    children: [
                        /*#__PURE__*/ _jsx("h1", {
                            children: t('authentication:confirmGeneration')
                        }),
                        /*#__PURE__*/ _jsx("p", {
                            children: /*#__PURE__*/ _jsx(Translation, {
                                elements: {
                                    1: ({ children })=>/*#__PURE__*/ _jsx("strong", {
                                            children: children
                                        })
                                },
                                i18nKey: "authentication:generatingNewAPIKeyWillInvalidate",
                                t: t
                            })
                        }),
                        /*#__PURE__*/ _jsx(Button, {
                            buttonStyle: "secondary",
                            onClick: ()=>{
                                toggleModal(modalSlug);
                            },
                            type: "button",
                            children: t('general:cancel')
                        }),
                        /*#__PURE__*/ _jsx(Button, {
                            onClick: handleGenerate,
                            children: t('authentication:generate')
                        })
                    ]
                })
            })
        ]
    });
};

//# sourceMappingURL=index.js.map