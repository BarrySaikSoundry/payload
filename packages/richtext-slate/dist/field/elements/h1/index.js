import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { H1Icon } from '../../icons/headings/H1/index.js';
import { ElementButton } from '../Button.js';
import { Heading1 } from './Heading1.js';
const name = 'h1';
export const h1 = {
    name,
    Button: ()=>/*#__PURE__*/ _jsx(ElementButton, {
            format: name,
            children: /*#__PURE__*/ _jsx(H1Icon, {})
        }),
    Element: Heading1
};

//# sourceMappingURL=index.js.map