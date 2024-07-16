'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
import React, { Fragment } from 'react';
import { PayloadIcon } from '../../graphics/Icon/index.js';
import { useConfig } from '../../providers/Config/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { StepNavProvider, useStepNav } from './context.js';
import './index.scss';
export { SetStepNav } from './SetStepNav.js';
import { useComponentMap } from '../../providers/ComponentMap/index.js';
const baseClass = 'step-nav';
const StepNav = ({ Link, className })=>{
    const { i18n } = useTranslation();
    const { stepNav } = useStepNav();
    const config = useConfig();
    const { routes: { admin } } = config;
    const { componentMap } = useComponentMap();
    const { t } = useTranslation();
    const Icon = componentMap?.Icon || /*#__PURE__*/ _jsx(PayloadIcon, {});
    const LinkElement = Link || 'a';
    return /*#__PURE__*/ _jsx(Fragment, {
        children: stepNav.length > 0 ? /*#__PURE__*/ _jsxs("nav", {
            className: [
                baseClass,
                className
            ].filter(Boolean).join(' '),
            children: [
                /*#__PURE__*/ _jsx(LinkElement, {
                    className: `${baseClass}__home`,
                    href: admin,
                    tabIndex: 0,
                    children: /*#__PURE__*/ _jsx("span", {
                        title: t('general:dashboard'),
                        children: Icon
                    })
                }),
                /*#__PURE__*/ _jsx("span", {
                    children: "/"
                }),
                stepNav.map((item, i)=>{
                    const StepLabel = getTranslation(item.label, i18n);
                    const isLast = stepNav.length === i + 1;
                    const Step = isLast ? /*#__PURE__*/ _jsx("span", {
                        className: `${baseClass}__last`,
                        children: StepLabel
                    }, i) : /*#__PURE__*/ _jsxs(Fragment, {
                        children: [
                            item.url ? /*#__PURE__*/ _jsx(LinkElement, {
                                href: item.url,
                                children: /*#__PURE__*/ _jsx("span", {
                                    children: StepLabel
                                }, i)
                            }) : /*#__PURE__*/ _jsx("span", {
                                children: StepLabel
                            }, i),
                            /*#__PURE__*/ _jsx("span", {
                                children: "/"
                            })
                        ]
                    }, i);
                    return Step;
                })
            ]
        }) : /*#__PURE__*/ _jsx("div", {
            className: [
                baseClass,
                className
            ].filter(Boolean).join(' '),
            children: /*#__PURE__*/ _jsx("div", {
                className: `${baseClass}__home`,
                children: /*#__PURE__*/ _jsx("span", {
                    title: t('general:dashboard'),
                    children: Icon
                })
            })
        })
    });
};
export { StepNav, StepNavProvider, useStepNav };

//# sourceMappingURL=index.js.map