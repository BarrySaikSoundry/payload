'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { RenderFields } from '../../forms/RenderFields/index.js';
import { Gutter } from '../Gutter/index.js';
import './index.scss';
const baseClass = 'document-fields';
export const DocumentFields = ({ AfterFields, BeforeFields, description, docPermissions, fieldMap, forceSidebarWrap, readOnly, schemaPath })=>{
    const mainFields = fieldMap.filter(({ isSidebar })=>!isSidebar);
    const sidebarFields = fieldMap.filter(({ isSidebar })=>isSidebar);
    const hasSidebarFields = sidebarFields && sidebarFields.length > 0;
    return /*#__PURE__*/ _jsx(React.Fragment, {
        children: /*#__PURE__*/ _jsxs("div", {
            className: [
                baseClass,
                hasSidebarFields ? `${baseClass}--has-sidebar` : `${baseClass}--no-sidebar`,
                forceSidebarWrap && `${baseClass}--force-sidebar-wrap`
            ].filter(Boolean).join(' '),
            children: [
                /*#__PURE__*/ _jsx("div", {
                    className: `${baseClass}__main`,
                    children: /*#__PURE__*/ _jsxs(Gutter, {
                        className: `${baseClass}__edit`,
                        children: [
                            /*#__PURE__*/ _jsx("header", {
                                className: `${baseClass}__header`,
                                children: description && /*#__PURE__*/ _jsx("div", {
                                    className: `${baseClass}__sub-header`
                                })
                            }),
                            BeforeFields,
                            /*#__PURE__*/ _jsx(RenderFields, {
                                className: `${baseClass}__fields`,
                                fieldMap: mainFields,
                                forceRender: 10,
                                path: "",
                                permissions: docPermissions?.fields,
                                readOnly: readOnly,
                                schemaPath: schemaPath
                            }),
                            AfterFields
                        ]
                    })
                }),
                hasSidebarFields && /*#__PURE__*/ _jsx("div", {
                    className: `${baseClass}__sidebar-wrap`,
                    children: /*#__PURE__*/ _jsx("div", {
                        className: `${baseClass}__sidebar`,
                        children: /*#__PURE__*/ _jsx("div", {
                            className: `${baseClass}__sidebar-fields`,
                            children: /*#__PURE__*/ _jsx(RenderFields, {
                                fieldMap: sidebarFields,
                                forceRender: 10,
                                path: "",
                                permissions: docPermissions?.fields,
                                readOnly: readOnly,
                                schemaPath: schemaPath
                            })
                        })
                    })
                })
            ]
        })
    });
};

//# sourceMappingURL=index.js.map