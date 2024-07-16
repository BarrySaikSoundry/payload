'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { XIcon } from '../../../icons/X/index.js';
import { useTranslation } from '../../../providers/Translation/index.js';
import { Tooltip } from '../../Tooltip/index.js';
import './index.scss';
const baseClass = 'multi-value-remove';
export const MultiValueRemove = (props)=>{
    const { innerProps: { className, onClick, onTouchEnd } } = props;
    const [showTooltip, setShowTooltip] = React.useState(false);
    const { t } = useTranslation();
    return /*#__PURE__*/ _jsxs("button", {
        "aria-label": t('general:remove'),
        className: [
            baseClass,
            className
        ].filter(Boolean).join(' '),
        onClick: (e)=>{
            setShowTooltip(false);
            onClick(e);
        },
        onKeyDown: (e)=>{
            if (e.key === 'Enter') {
                e.stopPropagation();
            }
        },
        onMouseDown: (e)=>e.stopPropagation(),
        onMouseEnter: ()=>setShowTooltip(true),
        onMouseLeave: ()=>setShowTooltip(false),
        onTouchEnd: onTouchEnd,
        type: "button",
        children: [
            /*#__PURE__*/ _jsx(Tooltip, {
                className: `${baseClass}__tooltip`,
                show: showTooltip,
                children: t('general:remove')
            }),
            /*#__PURE__*/ _jsx(XIcon, {
                className: `${baseClass}__icon`
            })
        ]
    });
};

//# sourceMappingURL=index.js.map