'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { ChevronIcon } from '../../icons/Chevron/index.js';
import { CopyIcon } from '../../icons/Copy/index.js';
import { MoreIcon } from '../../icons/More/index.js';
import { PlusIcon } from '../../icons/Plus/index.js';
import { XIcon } from '../../icons/X/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import { Popup, PopupList } from '../Popup/index.js';
import './index.scss';
const baseClass = 'array-actions';
export const ArrayAction = ({ addRow, duplicateRow, hasMaxRows, index, isSortable, moveRow, removeRow, rowCount })=>{
    const { t } = useTranslation();
    return /*#__PURE__*/ _jsx(Popup, {
        button: /*#__PURE__*/ _jsx(MoreIcon, {}),
        buttonClassName: `${baseClass}__button`,
        className: baseClass,
        horizontalAlign: "center",
        render: ({ close })=>{
            return /*#__PURE__*/ _jsxs(PopupList.ButtonGroup, {
                buttonSize: "small",
                children: [
                    isSortable && index !== 0 && /*#__PURE__*/ _jsxs(PopupList.Button, {
                        className: `${baseClass}__action ${baseClass}__move-up`,
                        onClick: ()=>{
                            moveRow(index, index - 1);
                            close();
                        },
                        children: [
                            /*#__PURE__*/ _jsx("div", {
                                className: `${baseClass}__action-chevron`,
                                children: /*#__PURE__*/ _jsx(ChevronIcon, {
                                    direction: "up"
                                })
                            }),
                            t('general:moveUp')
                        ]
                    }),
                    isSortable && index < rowCount - 1 && /*#__PURE__*/ _jsxs(PopupList.Button, {
                        className: `${baseClass}__action`,
                        onClick: ()=>{
                            moveRow(index, index + 1);
                            close();
                        },
                        children: [
                            /*#__PURE__*/ _jsx("div", {
                                className: `${baseClass}__action-chevron`,
                                children: /*#__PURE__*/ _jsx(ChevronIcon, {})
                            }),
                            t('general:moveDown')
                        ]
                    }),
                    !hasMaxRows && /*#__PURE__*/ _jsxs(React.Fragment, {
                        children: [
                            /*#__PURE__*/ _jsxs(PopupList.Button, {
                                className: `${baseClass}__action ${baseClass}__add`,
                                onClick: ()=>{
                                    addRow(index + 1);
                                    close();
                                },
                                children: [
                                    /*#__PURE__*/ _jsx(PlusIcon, {}),
                                    t('general:addBelow')
                                ]
                            }),
                            /*#__PURE__*/ _jsxs(PopupList.Button, {
                                className: `${baseClass}__action ${baseClass}__duplicate`,
                                onClick: ()=>{
                                    duplicateRow(index);
                                    close();
                                },
                                children: [
                                    /*#__PURE__*/ _jsx(CopyIcon, {}),
                                    t('general:duplicate')
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsxs(PopupList.Button, {
                        className: `${baseClass}__action ${baseClass}__remove`,
                        onClick: ()=>{
                            removeRow(index);
                            close();
                        },
                        children: [
                            /*#__PURE__*/ _jsx(XIcon, {}),
                            t('general:remove')
                        ]
                    })
                ]
            });
        },
        size: "medium"
    });
};

//# sourceMappingURL=index.js.map