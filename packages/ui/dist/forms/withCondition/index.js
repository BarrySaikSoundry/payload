'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { useFieldProps } from '../FieldPropsProvider/index.js';
import { WatchCondition } from './WatchCondition.js';
export const withCondition = (Field)=>{
    const CheckForCondition = (props)=>{
        const { name } = props;
        const { type, indexPath, path: pathFromContext } = useFieldProps();
        const path = pathFromContext ?? name;
        return /*#__PURE__*/ _jsx(WatchCondition, {
            indexPath: indexPath,
            name: name,
            path: path,
            type: type,
            children: /*#__PURE__*/ _jsx(Field, {
                ...props
            })
        });
    };
    return CheckForCondition;
};

//# sourceMappingURL=index.js.map