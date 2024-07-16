import { jsx as _jsx } from "react/jsx-runtime";
import React, { forwardRef } from 'react';
import './index.scss';
const baseClass = 'gutter';
export const Gutter = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { children, className, left = true, negativeLeft = false, negativeRight = false, right = true } = props;
    const shouldPadLeft = left && !negativeLeft;
    const shouldPadRight = right && !negativeRight;
    return /*#__PURE__*/ _jsx("div", {
        className: [
            shouldPadLeft && `${baseClass}--left`,
            shouldPadRight && `${baseClass}--right`,
            negativeLeft && `${baseClass}--negative-left`,
            negativeRight && `${baseClass}--negative-right`,
            className
        ].filter(Boolean).join(' '),
        ref: ref,
        children: children
    });
});
Gutter.displayName = 'Gutter';

//# sourceMappingURL=index.js.map