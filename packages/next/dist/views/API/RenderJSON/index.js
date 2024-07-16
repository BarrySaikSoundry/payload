'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChevronIcon } from '@payloadcms/ui';
import * as React from 'react';
const chars = {
    leftCurlyBracket: '\u007B',
    leftSquareBracket: '\u005B',
    rightCurlyBracket: '\u007D',
    rightSquareBracket: '\u005D'
};
const baseClass = 'query-inspector';
const Bracket = ({ type, comma = false, position })=>{
    const rightBracket = type === 'object' ? chars.rightCurlyBracket : chars.rightSquareBracket;
    const leftBracket = type === 'object' ? chars.leftCurlyBracket : chars.leftSquareBracket;
    const bracketToRender = position === 'end' ? rightBracket : leftBracket;
    return /*#__PURE__*/ _jsxs("span", {
        className: `${baseClass}__bracket ${baseClass}__bracket--position-${position}`,
        children: [
            bracketToRender,
            position === 'end' && comma ? ',' : null
        ]
    });
};
export const RenderJSON = ({ isEmpty = false, object, objectKey, parentType = 'object', trailingComma = false })=>{
    const objectKeys = object ? Object.keys(object) : [];
    const objectLength = objectKeys.length;
    const [isOpen, setIsOpen] = React.useState(true);
    const isNestedAndEmpty = isEmpty && (parentType === 'object' || parentType === 'array');
    return /*#__PURE__*/ _jsxs("li", {
        className: isNestedAndEmpty ? `${baseClass}__row-line--nested` : '',
        children: [
            /*#__PURE__*/ _jsxs("button", {
                "aria-label": "toggle",
                className: `${baseClass}__list-toggle ${isEmpty ? `${baseClass}__list-toggle--empty` : ''}`,
                onClick: ()=>setIsOpen(!isOpen),
                type: "button",
                children: [
                    isEmpty ? null : /*#__PURE__*/ _jsx(ChevronIcon, {
                        className: `${baseClass}__toggle-row-icon ${baseClass}__toggle-row-icon--${isOpen ? 'open' : 'closed'}`
                    }),
                    /*#__PURE__*/ _jsxs("span", {
                        children: [
                            objectKey && `"${objectKey}": `,
                            /*#__PURE__*/ _jsx(Bracket, {
                                position: "start",
                                type: parentType
                            }),
                            isEmpty ? /*#__PURE__*/ _jsx(Bracket, {
                                comma: trailingComma,
                                position: "end",
                                type: parentType
                            }) : null
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ _jsx("ul", {
                className: `${baseClass}__json-children`,
                children: isOpen && objectKeys.map((key, keyIndex)=>{
                    let value = object[key];
                    let type = 'string';
                    const isLastKey = keyIndex === objectLength - 1;
                    if (value === null) {
                        type = 'null';
                    } else if (value instanceof Date) {
                        type = 'date';
                        value = value.toISOString();
                    } else if (Array.isArray(value)) {
                        type = 'array';
                    } else if (typeof value === 'object') {
                        type = 'object';
                    } else if (typeof value === 'number') {
                        type = 'number';
                    } else if (typeof value === 'boolean') {
                        type = 'boolean';
                    } else {
                        type = 'string';
                    }
                    if (type === 'object' || type === 'array') {
                        return /*#__PURE__*/ _jsx(RenderJSON, {
                            isEmpty: value.length === 0 || Object.keys(value).length === 0,
                            object: value,
                            objectKey: parentType === 'object' ? key : undefined,
                            parentType: type,
                            trailingComma: !isLastKey
                        }, `${key}-${keyIndex}`);
                    }
                    if (type === 'date' || type === 'string' || type === 'null' || type === 'number' || type === 'boolean') {
                        const parentHasKey = Boolean(parentType === 'object' && key);
                        const rowClasses = [
                            `${baseClass}__row-line`,
                            `${baseClass}__value-type--${type}`,
                            `${baseClass}__row-line--${objectKey ? 'nested' : 'top'}`
                        ].filter(Boolean).join(' ');
                        return /*#__PURE__*/ _jsxs("li", {
                            className: rowClasses,
                            children: [
                                parentHasKey ? /*#__PURE__*/ _jsx("span", {
                                    children: `"${key}": `
                                }) : null,
                                /*#__PURE__*/ _jsx("span", {
                                    className: `${baseClass}__value`,
                                    children: JSON.stringify(value)
                                }),
                                isLastKey ? '' : ','
                            ]
                        }, `${key}-${keyIndex}`);
                    }
                })
            }),
            !isEmpty && /*#__PURE__*/ _jsx("span", {
                children: /*#__PURE__*/ _jsx(Bracket, {
                    comma: trailingComma,
                    position: "end",
                    type: parentType
                })
            })
        ]
    });
};

//# sourceMappingURL=index.js.map