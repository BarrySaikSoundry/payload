import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { OLIcon } from '../../icons/OrderedList/index.js';
import { ListButton } from '../ListButton.js';
import { OrderedList } from './OrderedList.js';
const name = 'ol';
export const ol = {
    name,
    Button: ()=>/*#__PURE__*/ _jsx(ListButton, {
            format: name,
            children: /*#__PURE__*/ _jsx(OLIcon, {})
        }),
    Element: OrderedList
};

//# sourceMappingURL=index.js.map