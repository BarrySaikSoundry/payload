import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { ItalicIcon } from '../../icons/Italic/index.js';
import { LeafButton } from '../Button.js';
import { Italic } from './Italic/index.js';
export const italic = {
    name: 'italic',
    Button: ()=>/*#__PURE__*/ _jsx(LeafButton, {
            format: "italic",
            children: /*#__PURE__*/ _jsx(ItalicIcon, {})
        }),
    Leaf: Italic
};

//# sourceMappingURL=index.js.map