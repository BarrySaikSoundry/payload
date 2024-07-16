'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { components as SelectComponents } from 'react-select';
import './index.scss';
const baseClass = 'multi-value-label';
export const MultiValueLabel = (props)=>{
    // @ts-expect-error-next-line// TODO Fix this - moduleResolution 16 breaks our declare module
    const { selectProps: { customProps: { draggableProps } = {} } = {} } = props;
    return /*#__PURE__*/ _jsx("div", {
        className: baseClass,
        children: /*#__PURE__*/ _jsx(SelectComponents.MultiValueLabel, {
            ...props,
            innerProps: {
                className: `${baseClass}__text`,
                ...draggableProps || {}
            }
        })
    });
};

//# sourceMappingURL=index.js.map