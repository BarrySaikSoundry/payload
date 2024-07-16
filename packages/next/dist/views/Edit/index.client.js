'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SetViewActions, useComponentMap, useDocumentInfo } from '@payloadcms/ui';
import React, { Fragment } from 'react';
export const EditViewClient = ()=>{
    const { collectionSlug, globalSlug } = useDocumentInfo();
    const { getComponentMap } = useComponentMap();
    const { Edit, actionsMap } = getComponentMap({
        collectionSlug,
        globalSlug
    });
    if (!Edit) {
        return null;
    }
    return /*#__PURE__*/ _jsxs(Fragment, {
        children: [
            /*#__PURE__*/ _jsx(SetViewActions, {
                actions: actionsMap?.Edit?.Default
            }),
            Edit
        ]
    });
};

//# sourceMappingURL=index.client.js.map