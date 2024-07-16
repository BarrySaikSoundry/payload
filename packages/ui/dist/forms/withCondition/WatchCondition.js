'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React, { Fragment } from 'react';
import { useFormFields } from '../Form/context.js';
export const WatchCondition = (props)=>{
    const { name, type, children, indexPath, path: pathFromProps } = props;
    const path = typeof pathFromProps === 'string' ? pathFromProps : name;
    let formStateID = path;
    if ([
        'collapsible',
        'row'
    ].includes(type)) {
        const index = indexPath.split('.').pop();
        formStateID = `${path ? `${path}.` : ''}_index-${index}`;
    }
    const field = useFormFields(([fields])=>fields && fields?.[formStateID] || null);
    const { passesCondition } = field || {};
    if (passesCondition === false) {
        return null;
    }
    return /*#__PURE__*/ _jsx(Fragment, {
        children: children
    });
};

//# sourceMappingURL=WatchCondition.js.map