import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { CodeIcon } from '../../icons/Code/index.js';
import { LeafButton } from '../Button.js';
import { Code } from './Code/index.js';
export const code = {
    name: 'code',
    Button: ()=>/*#__PURE__*/ _jsx(LeafButton, {
            format: "code",
            children: /*#__PURE__*/ _jsx(CodeIcon, {})
        }),
    Leaf: Code
};

//# sourceMappingURL=index.js.map