import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { StrikethroughIcon } from '../../icons/Strikethrough/index.js';
import { LeafButton } from '../Button.js';
import { Strikethrough } from './Strikethrough/index.js';
export const strikethrough = {
    name: 'strikethrough',
    Button: ()=>/*#__PURE__*/ _jsx(LeafButton, {
            format: "strikethrough",
            children: /*#__PURE__*/ _jsx(StrikethroughIcon, {})
        }),
    Leaf: Strikethrough
};

//# sourceMappingURL=index.js.map