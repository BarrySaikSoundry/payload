import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { H4Icon } from '../../icons/headings/H4/index.js';
import { ElementButton } from '../Button.js';
import { Heading4 } from './Heading4.js';
const name = 'h4';
export const h4 = {
    name,
    Button: ()=>/*#__PURE__*/ _jsx(ElementButton, {
            format: name,
            children: /*#__PURE__*/ _jsx(H4Icon, {})
        }),
    Element: Heading4
};

//# sourceMappingURL=index.js.map