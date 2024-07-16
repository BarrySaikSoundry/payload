'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { SearchIcon } from '../../../../icons/Search/index.js';
import { useTranslation } from '../../../../providers/Translation/index.js';
import './index.scss';
const baseClass = 'block-search';
export const BlockSearch = (props)=>{
    const { setSearchTerm } = props;
    const { t } = useTranslation();
    const handleChange = (e)=>{
        setSearchTerm(e.target.value);
    };
    return /*#__PURE__*/ _jsxs("div", {
        className: baseClass,
        children: [
            /*#__PURE__*/ _jsx("input", {
                className: `${baseClass}__input`,
                onChange: handleChange,
                placeholder: t('fields:searchForBlock')
            }),
            /*#__PURE__*/ _jsx(SearchIcon, {})
        ]
    });
};

//# sourceMappingURL=index.js.map