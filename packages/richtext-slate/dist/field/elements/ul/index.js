import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { ULIcon } from '../../icons/UnorderedList/index.js';
import { ListButton } from '../ListButton.js';
import { UnorderedList } from './UnorderedList.js';
const name = 'ul';
export const ul = {
    name,
    Button: ()=>/*#__PURE__*/ _jsx(ListButton, {
            format: name,
            children: /*#__PURE__*/ _jsx(ULIcon, {})
        }),
    Element: UnorderedList
};

//# sourceMappingURL=index.js.map