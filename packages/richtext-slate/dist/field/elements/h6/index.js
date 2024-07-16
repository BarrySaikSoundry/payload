import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { H6Icon } from '../../icons/headings/H6/index.js';
import { ElementButton } from '../Button.js';
import { Heading6 } from './Heading6.js';
const name = 'h6';
export const h6 = {
    name,
    Button: ()=>/*#__PURE__*/ _jsx(ElementButton, {
            format: name,
            children: /*#__PURE__*/ _jsx(H6Icon, {})
        }),
    Element: Heading6
};

//# sourceMappingURL=index.js.map