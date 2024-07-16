import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { BlockquoteIcon } from '../../icons/Blockquote/index.js';
import { ElementButton } from '../Button.js';
import { Blockquote } from './Blockquote.js';
const name = 'blockquote';
export const blockquote = {
    name,
    Button: ()=>/*#__PURE__*/ _jsx(ElementButton, {
            format: name,
            children: /*#__PURE__*/ _jsx(BlockquoteIcon, {})
        }),
    Element: Blockquote
};

//# sourceMappingURL=index.js.map