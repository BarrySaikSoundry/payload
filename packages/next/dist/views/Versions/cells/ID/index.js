'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useTableCell } from '@payloadcms/ui';
import React, { Fragment } from 'react';
export const IDCell = ()=>{
    const { cellData } = useTableCell();
    return /*#__PURE__*/ _jsx(Fragment, {
        children: cellData
    });
};

//# sourceMappingURL=index.js.map