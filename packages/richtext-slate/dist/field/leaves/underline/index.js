import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { UnderlineIcon } from '../../icons/Underline/index.js';
import { LeafButton } from '../Button.js';
import { Underline } from './Underline/index.js';
export const underline = {
    name: 'underline',
    Button: ()=>/*#__PURE__*/ _jsx(LeafButton, {
            format: "underline",
            children: /*#__PURE__*/ _jsx(UnderlineIcon, {})
        }),
    Leaf: Underline
};

//# sourceMappingURL=index.js.map