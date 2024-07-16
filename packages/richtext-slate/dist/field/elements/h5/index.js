import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { H5Icon } from '../../icons/headings/H5/index.js';
import { ElementButton } from '../Button.js';
import { Heading5 } from './Heading5.js';
const name = 'h5';
export const h5 = {
    name,
    Button: ()=>/*#__PURE__*/ _jsx(ElementButton, {
            format: name,
            children: /*#__PURE__*/ _jsx(H5Icon, {})
        }),
    Element: Heading5
};

//# sourceMappingURL=index.js.map