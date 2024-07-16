'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useTableCell } from '@payloadcms/ui';
import React from 'react';
export const RichTextCell = ()=>{
    const { cellData } = useTableCell();
    const flattenedText = cellData?.map((i)=>i?.children?.map((c)=>c.text)).join(' ');
    // Limiting the number of characters shown is done in a CSS rule
    return /*#__PURE__*/ _jsx("span", {
        children: flattenedText
    });
};

//# sourceMappingURL=index.js.map