'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useConfig, useWatchForm } from '@payloadcms/ui';
import React from 'react';
export const LinkToDocClient = ()=>{
    const form = useWatchForm();
    const fields = form.fields;
    const { doc: { value: { relationTo, value: docId } } } = fields;
    const config = useConfig();
    const { routes: { admin: adminRoute }, serverURL } = config;
    const href = `${serverURL}${adminRoute}/collections/${relationTo}/${docId}`;
    return /*#__PURE__*/ _jsxs("div", {
        children: [
            /*#__PURE__*/ _jsx("div", {
                children: /*#__PURE__*/ _jsx("span", {
                    className: "label",
                    style: {
                        color: '#9A9A9A'
                    },
                    children: "Doc URL"
                })
            }),
            /*#__PURE__*/ _jsx("div", {
                style: {
                    fontWeight: '600',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                },
                children: /*#__PURE__*/ _jsx("a", {
                    href: href,
                    children: href
                })
            })
        ]
    });
};

//# sourceMappingURL=index.client.js.map