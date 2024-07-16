'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronIcon, LinkIcon, Popup, PopupList, XIcon, useTranslation } from '@payloadcms/ui';
import React from 'react';
import { useLivePreviewContext } from '../../Context/context.js';
import { PreviewFrameSizeInput } from '../SizeInput/index.js';
const baseClass = 'live-preview-toolbar-controls';
const zoomOptions = [
    50,
    75,
    100,
    125,
    150,
    200
];
export const ToolbarControls = ()=>{
    const { breakpoint, breakpoints, setBreakpoint, setPreviewWindowType, setZoom, url, zoom } = useLivePreviewContext();
    const { t } = useTranslation();
    const customOption = {
        label: t('general:custom'),
        value: 'custom'
    };
    return /*#__PURE__*/ _jsxs("div", {
        className: baseClass,
        children: [
            breakpoints?.length > 0 && /*#__PURE__*/ _jsx(Popup, {
                button: /*#__PURE__*/ _jsxs(React.Fragment, {
                    children: [
                        /*#__PURE__*/ _jsx("span", {
                            children: breakpoints.find((bp)=>bp.name == breakpoint)?.label ?? customOption.label
                        }),
                        " ",
                        /*#__PURE__*/ _jsx(ChevronIcon, {
                            className: `${baseClass}__chevron`
                        })
                    ]
                }),
                className: `${baseClass}__breakpoint`,
                horizontalAlign: "right",
                render: ({ close })=>/*#__PURE__*/ _jsx(PopupList.ButtonGroup, {
                        children: /*#__PURE__*/ _jsxs(React.Fragment, {
                            children: [
                                breakpoints.map((bp)=>/*#__PURE__*/ _jsx(PopupList.Button, {
                                        active: bp.name == breakpoint,
                                        onClick: ()=>{
                                            setBreakpoint(bp.name);
                                            close();
                                        },
                                        children: bp.label
                                    }, bp.name)),
                                breakpoint === 'custom' && /*#__PURE__*/ _jsx(PopupList.Button, {
                                    active: breakpoint == customOption.value,
                                    onClick: ()=>{
                                        setBreakpoint(customOption.value);
                                        close();
                                    },
                                    children: customOption.label
                                })
                            ]
                        })
                    }),
                showScrollbar: true,
                verticalAlign: "bottom"
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: `${baseClass}__device-size`,
                children: [
                    /*#__PURE__*/ _jsx(PreviewFrameSizeInput, {
                        axis: "x"
                    }),
                    /*#__PURE__*/ _jsx("span", {
                        className: `${baseClass}__size-divider`,
                        children: /*#__PURE__*/ _jsx(XIcon, {})
                    }),
                    /*#__PURE__*/ _jsx(PreviewFrameSizeInput, {
                        axis: "y"
                    })
                ]
            }),
            /*#__PURE__*/ _jsx(Popup, {
                button: /*#__PURE__*/ _jsxs(React.Fragment, {
                    children: [
                        /*#__PURE__*/ _jsxs("span", {
                            children: [
                                zoom * 100,
                                "%"
                            ]
                        }),
                        " ",
                        /*#__PURE__*/ _jsx(ChevronIcon, {
                            className: `${baseClass}__chevron`
                        })
                    ]
                }),
                className: `${baseClass}__zoom`,
                horizontalAlign: "right",
                render: ({ close })=>/*#__PURE__*/ _jsx(PopupList.ButtonGroup, {
                        children: /*#__PURE__*/ _jsx(React.Fragment, {
                            children: zoomOptions.map((zoomValue)=>/*#__PURE__*/ _jsxs(PopupList.Button, {
                                    active: zoom * 100 == zoomValue,
                                    onClick: ()=>{
                                        setZoom(zoomValue / 100);
                                        close();
                                    },
                                    children: [
                                        zoomValue,
                                        "%"
                                    ]
                                }, zoomValue))
                        })
                    }),
                showScrollbar: true,
                verticalAlign: "bottom"
            }),
            /*#__PURE__*/ _jsx("a", {
                className: `${baseClass}__external`,
                href: url,
                onClick: (e)=>{
                    e.preventDefault();
                    setPreviewWindowType('popup');
                },
                type: "button",
                children: /*#__PURE__*/ _jsx(LinkIcon, {})
            })
        ]
    });
};

//# sourceMappingURL=index.js.map