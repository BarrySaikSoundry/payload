import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { H3Icon } from '../../icons/headings/H3/index.js';
import { ElementButton } from '../Button.js';
import { Heading3 } from './Heading3.js';
const name = 'h3';
export const h3 = {
    name,
    Button: ()=>/*#__PURE__*/ _jsx(ElementButton, {
            format: name,
            children: /*#__PURE__*/ _jsx(H3Icon, {})
        }),
    Element: Heading3
};

//# sourceMappingURL=index.js.map