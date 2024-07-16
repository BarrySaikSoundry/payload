'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React, { Fragment } from 'react';
import { useDocumentInfo } from '../../providers/DocumentInfo/index.js';
import { IDLabel } from '../IDLabel/index.js';
import './index.scss';
const baseClass = 'render-title';
export const RenderTitle = (props)=>{
    const { className, element = 'h1', fallback, title: titleFromProps } = props;
    const { id, isInitializing, title: titleFromContext } = useDocumentInfo();
    const title = titleFromProps || titleFromContext || fallback;
    const idAsTitle = title === id;
    const Tag = element;
    // Render and invisible character to prevent layout shift when the title populates from context
    const EmptySpace = /*#__PURE__*/ _jsx(Fragment, {
        children: " "
    });
    return /*#__PURE__*/ _jsx(Tag, {
        className: [
            className,
            baseClass,
            idAsTitle && `${baseClass}--has-id`
        ].filter(Boolean).join(' '),
        title: title,
        children: isInitializing ? EmptySpace : /*#__PURE__*/ _jsx(Fragment, {
            children: idAsTitle ? /*#__PURE__*/ _jsx(IDLabel, {
                className: `${baseClass}__id`,
                id: id
            }) : title || EmptySpace
        })
    });
};

//# sourceMappingURL=index.js.map