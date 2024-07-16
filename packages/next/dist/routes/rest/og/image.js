import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
export const OGImage = ({ Icon, description, fontFamily = 'Arial, sans-serif', leader, title })=>{
    return /*#__PURE__*/ _jsxs("div", {
        style: {
            backgroundColor: '#000',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            fontFamily,
            height: '100%',
            justifyContent: 'space-between',
            padding: '100px',
            width: '100%'
        },
        children: [
            /*#__PURE__*/ _jsxs("div", {
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    fontSize: 50,
                    height: '100%'
                },
                children: [
                    leader && /*#__PURE__*/ _jsx("div", {
                        style: {
                            fontSize: 30,
                            marginBottom: 10
                        },
                        children: leader
                    }),
                    /*#__PURE__*/ _jsx("p", {
                        style: {
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                            display: '-webkit-box',
                            fontSize: 90,
                            lineHeight: 1,
                            marginBottom: 0,
                            marginTop: 0,
                            textOverflow: 'ellipsis'
                        },
                        children: title
                    }),
                    description && /*#__PURE__*/ _jsx("p", {
                        style: {
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                            display: '-webkit-box',
                            flexGrow: 1,
                            fontSize: 30,
                            lineHeight: 1,
                            marginBottom: 0,
                            marginTop: 40,
                            textOverflow: 'ellipsis'
                        },
                        children: description
                    })
                ]
            }),
            /*#__PURE__*/ _jsx("div", {
                style: {
                    alignItems: 'flex-end',
                    display: 'flex',
                    flexShrink: 0,
                    height: '38px',
                    justifyContent: 'center',
                    width: '38px'
                },
                children: /*#__PURE__*/ _jsx(Icon, {
                    fill: "white"
                })
            })
        ]
    });
};

//# sourceMappingURL=image.js.map