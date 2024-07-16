'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// TODO: abstract the `next/navigation` dependency out from this component
import React, { useCallback } from 'react';
import { ChevronIcon } from '../../icons/Chevron/index.js';
import { useListQuery } from '../../providers/ListQuery/index.js';
import { useSearchParams } from '../../providers/SearchParams/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import './index.scss';
const baseClass = 'sort-column';
export const SortColumn = (props)=>{
    const { name, Label, disable = false, label } = props;
    const { searchParams } = useSearchParams();
    const { refineListData } = useListQuery();
    const { t } = useTranslation();
    const { sort } = searchParams;
    const desc = `-${name}`;
    const asc = name;
    const ascClasses = [
        `${baseClass}__asc`
    ];
    if (sort === asc) ascClasses.push(`${baseClass}--active`);
    const descClasses = [
        `${baseClass}__desc`
    ];
    if (sort === desc) descClasses.push(`${baseClass}--active`);
    const setSort = useCallback((newSort)=>{
        refineListData({
            sort: newSort
        });
    }, [
        refineListData
    ]);
    return /*#__PURE__*/ _jsxs("div", {
        className: baseClass,
        children: [
            /*#__PURE__*/ _jsx("span", {
                className: `${baseClass}__label`,
                children: Label
            }),
            !disable && /*#__PURE__*/ _jsxs("div", {
                className: `${baseClass}__buttons`,
                children: [
                    /*#__PURE__*/ _jsx("button", {
                        "aria-label": t('general:sortByLabelDirection', {
                            direction: t('general:ascending'),
                            label
                        }),
                        className: [
                            ...ascClasses,
                            `${baseClass}__button`
                        ].filter(Boolean).join(' '),
                        onClick: ()=>setSort(asc),
                        type: "button",
                        children: /*#__PURE__*/ _jsx(ChevronIcon, {
                            direction: "up"
                        })
                    }),
                    /*#__PURE__*/ _jsx("button", {
                        "aria-label": t('general:sortByLabelDirection', {
                            direction: t('general:descending'),
                            label
                        }),
                        className: [
                            ...descClasses,
                            `${baseClass}__button`
                        ].filter(Boolean).join(' '),
                        onClick: ()=>setSort(desc),
                        type: "button",
                        children: /*#__PURE__*/ _jsx(ChevronIcon, {})
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=index.js.map