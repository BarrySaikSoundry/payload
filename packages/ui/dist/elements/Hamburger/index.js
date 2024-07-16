'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { ChevronIcon } from '../../icons/Chevron/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import './index.scss';
const baseClass = 'hamburger';
export const Hamburger = (props)=>{
    const { t } = useTranslation();
    const { closeIcon = 'x', isActive = false } = props;
    return /*#__PURE__*/ _jsx("div", {
        className: baseClass,
        children: /*#__PURE__*/ _jsx("div", {
            className: `${baseClass}__wrapper`,
            children: /*#__PURE__*/ _jsxs("div", {
                className: `${baseClass}__icon`,
                children: [
                    !isActive && /*#__PURE__*/ _jsxs("div", {
                        className: `${baseClass}__lines`,
                        title: t('general:open'),
                        children: [
                            /*#__PURE__*/ _jsx("div", {
                                className: `${baseClass}__line ${baseClass}__top`
                            }),
                            /*#__PURE__*/ _jsx("div", {
                                className: `${baseClass}__line ${baseClass}__middle`
                            }),
                            /*#__PURE__*/ _jsx("div", {
                                className: `${baseClass}__line ${baseClass}__bottom`
                            })
                        ]
                    }),
                    isActive && /*#__PURE__*/ _jsxs("div", {
                        "aria-label": closeIcon === 'collapse' ? t('general:collapse') : t('general:close'),
                        className: `${baseClass}__close-icon`,
                        title: closeIcon === 'collapse' ? t('general:collapse') : t('general:close'),
                        children: [
                            closeIcon === 'x' && /*#__PURE__*/ _jsxs(React.Fragment, {
                                children: [
                                    /*#__PURE__*/ _jsx("div", {
                                        className: `${baseClass}__line ${baseClass}__x-left`
                                    }),
                                    /*#__PURE__*/ _jsx("div", {
                                        className: `${baseClass}__line ${baseClass}__x-right`
                                    })
                                ]
                            }),
                            closeIcon === 'collapse' && /*#__PURE__*/ _jsx(ChevronIcon, {
                                className: `${baseClass}__collapse-chevron`,
                                direction: "left"
                            })
                        ]
                    })
                ]
            })
        })
    });
};

//# sourceMappingURL=index.js.map