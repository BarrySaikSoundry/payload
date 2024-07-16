'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Gutter, useConfig, useStepNav, useTranslation } from '@payloadcms/ui';
import LinkImport from 'next/link.js';
import React, { useEffect } from 'react';
const baseClass = 'not-found';
const Link = LinkImport.default || LinkImport;
export const NotFoundClient = (props)=>{
    const { marginTop = 'large' } = props;
    const { setStepNav } = useStepNav();
    const { t } = useTranslation();
    const { routes: { admin } } = useConfig();
    useEffect(()=>{
        setStepNav([
            {
                label: t('general:notFound')
            }
        ]);
    }, [
        setStepNav,
        t
    ]);
    return /*#__PURE__*/ _jsx("div", {
        className: [
            baseClass,
            marginTop && `${baseClass}--margin-top-${marginTop}`
        ].filter(Boolean).join(' '),
        children: /*#__PURE__*/ _jsxs(Gutter, {
            className: `${baseClass}__wrap`,
            children: [
                /*#__PURE__*/ _jsx("h1", {
                    children: t('general:nothingFound')
                }),
                /*#__PURE__*/ _jsx("p", {
                    children: t('general:sorryNotFound')
                }),
                /*#__PURE__*/ _jsx(Button, {
                    Link: Link,
                    className: `${baseClass}__button`,
                    el: "link",
                    to: `${admin}`,
                    children: t('general:backToDashboard')
                })
            ]
        })
    });
};

//# sourceMappingURL=index.client.js.map