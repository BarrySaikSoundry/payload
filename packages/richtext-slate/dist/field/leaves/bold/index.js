import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { BoldIcon } from '../../icons/Bold/index.js';
import { LeafButton } from '../Button.js';
import { Bold } from './Bold/index.js';
export const bold = {
    name: 'bold',
    Button: ()=>/*#__PURE__*/ _jsx(LeafButton, {
            format: "bold",
            children: /*#__PURE__*/ _jsx(BoldIcon, {})
        }),
    Leaf: Bold
};

//# sourceMappingURL=index.js.map