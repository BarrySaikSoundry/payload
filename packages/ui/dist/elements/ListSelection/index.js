'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { Fragment } from 'react';
import { SelectAllStatus, useSelection } from '../../providers/Selection/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import './index.scss';
const baseClass = 'list-selection';
export const ListSelection = ({ label })=>{
    const { count, selectAll, toggleAll, totalDocs } = useSelection();
    const { t } = useTranslation();
    if (count === 0) {
        return null;
    }
    return /*#__PURE__*/ _jsxs("div", {
        className: baseClass,
        children: [
            /*#__PURE__*/ _jsx("span", {
                children: t('general:selectedCount', {
                    count,
                    label
                })
            }),
            selectAll !== SelectAllStatus.AllAvailable && /*#__PURE__*/ _jsxs(Fragment, {
                children: [
                    ' ',
                    "—",
                    /*#__PURE__*/ _jsx("button", {
                        "aria-label": t('general:selectAll', {
                            count,
                            label
                        }),
                        className: `${baseClass}__button`,
                        onClick: ()=>toggleAll(true),
                        type: "button",
                        children: t('general:selectAll', {
                            count: totalDocs,
                            label
                        })
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=index.js.map