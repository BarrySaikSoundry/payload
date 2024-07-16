'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getTranslation } from '@payloadcms/translations';
// TODO: abstract the `next/navigation` dependency out from this component
import { usePathname, useRouter } from 'next/navigation.js';
import React, { useEffect, useRef, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce.js';
import { SearchIcon } from '../../icons/Search/index.js';
import { useSearchParams } from '../../providers/SearchParams/index.js';
import { useTranslation } from '../../providers/Translation/index.js';
import './index.scss';
const baseClass = 'search-filter';
export const SearchFilter = (props)=>{
    const { fieldLabel = 'ID', fieldName = 'id', handleChange, listSearchableFields } = props;
    const { searchParams } = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const { i18n, t } = useTranslation();
    const [search, setSearch] = useState(typeof searchParams?.search === 'string' ? searchParams?.search : '');
    const [previousSearch, setPreviousSearch] = useState('');
    const placeholder = useRef(t('general:searchBy', {
        label: getTranslation(fieldLabel, i18n)
    }));
    const debouncedSearch = useDebounce(search, 300);
    useEffect(()=>{
        if (debouncedSearch !== previousSearch) {
            if (handleChange) handleChange(debouncedSearch);
            setPreviousSearch(debouncedSearch);
        }
    }, [
        debouncedSearch,
        previousSearch,
        router,
        fieldName,
        searchParams,
        handleChange,
        listSearchableFields,
        pathname
    ]);
    useEffect(()=>{
        if (listSearchableFields?.length > 0) {
            placeholder.current = listSearchableFields.reduce((placeholderText, field, i)=>{
                const label = 'fieldComponentProps' in field && 'label' in field.fieldComponentProps && field.fieldComponentProps.label ? field.fieldComponentProps.label : field.name;
                if (i === 0) {
                    return `${t('general:searchBy', {
                        label: getTranslation(label, i18n)
                    })}`;
                }
                if (i === listSearchableFields.length - 1) {
                    return `${placeholderText} ${t('general:or')} ${getTranslation(label, i18n)}`;
                }
                return `${placeholderText}, ${getTranslation(label, i18n)}`;
            }, '');
        } else {
            placeholder.current = t('general:searchBy', {
                label: getTranslation(fieldLabel, i18n)
            });
        }
    }, [
        t,
        listSearchableFields,
        i18n,
        fieldLabel
    ]);
    return /*#__PURE__*/ _jsxs("div", {
        className: baseClass,
        children: [
            /*#__PURE__*/ _jsx("input", {
                className: `${baseClass}__input`,
                onChange: (e)=>setSearch(e.target.value),
                placeholder: placeholder.current,
                type: "text",
                value: search || ''
            }),
            /*#__PURE__*/ _jsx(SearchIcon, {})
        ]
    });
};

//# sourceMappingURL=index.js.map