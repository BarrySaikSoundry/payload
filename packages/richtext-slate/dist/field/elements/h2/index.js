import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { H2Icon } from '../../icons/headings/H2/index.js';
import { ElementButton } from '../Button.js';
import { Heading2 } from './Heading2.js';
const name = 'h2';
export const h2 = {
    name,
    Button: ()=>/*#__PURE__*/ _jsx(ElementButton, {
            format: name,
            children: /*#__PURE__*/ _jsx(H2Icon, {})
        }),
    Element: Heading2
};

//# sourceMappingURL=index.js.map