'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as qs from 'qs-esm';
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useLocale } from '../Locale/index.js';
import { useSearchParams } from '../SearchParams/index.js';
export var SelectAllStatus;
(function(SelectAllStatus) {
    SelectAllStatus["AllAvailable"] = "allAvailable";
    SelectAllStatus["AllInPage"] = "allInPage";
    SelectAllStatus["None"] = "none";
    SelectAllStatus["Some"] = "some";
})(SelectAllStatus || (SelectAllStatus = {}));
const Context = /*#__PURE__*/ createContext({});
export const SelectionProvider = ({ children, docs = [], totalDocs })=>{
    const contextRef = useRef({});
    const { code: locale } = useLocale();
    const [selected, setSelected] = useState(()=>{
        const rows = {};
        docs.forEach(({ id })=>{
            rows[id] = false;
        });
        return rows;
    });
    const [selectAll, setSelectAll] = useState("none");
    const [count, setCount] = useState(0);
    const { searchParams } = useSearchParams();
    const toggleAll = useCallback((allAvailable = false)=>{
        const rows = {};
        if (allAvailable) {
            setSelectAll("allAvailable");
            docs.forEach(({ id })=>{
                rows[id] = true;
            });
        } else if (selectAll === "allAvailable" || selectAll === "allInPage") {
            setSelectAll("none");
            docs.forEach(({ id })=>{
                rows[id] = false;
            });
        } else {
            docs.forEach(({ id })=>{
                rows[id] = selectAll !== "some";
            });
        }
        setSelected(rows);
    }, [
        docs,
        selectAll
    ]);
    const setSelection = useCallback((id)=>{
        const isSelected = !selected[id];
        const newSelected = {
            ...selected,
            [id]: isSelected
        };
        if (!isSelected) {
            setSelectAll("some");
        }
        setSelected(newSelected);
    }, [
        selected
    ]);
    const getQueryParams = useCallback((additionalParams)=>{
        let where;
        if (selectAll === "allAvailable") {
            const params = searchParams?.where;
            where = params || {
                id: {
                    not_equals: ''
                }
            };
        } else {
            where = {
                id: {
                    in: Object.keys(selected).filter((id)=>selected[id]).map((id)=>id)
                }
            };
        }
        if (additionalParams) {
            where = {
                and: [
                    {
                        ...additionalParams
                    },
                    where
                ]
            };
        }
        return qs.stringify({
            locale,
            where
        }, {
            addQueryPrefix: true
        });
    }, [
        selectAll,
        selected,
        locale,
        searchParams
    ]);
    useEffect(()=>{
        if (selectAll === "allAvailable") {
            return;
        }
        let some = false;
        let all = true;
        Object.values(selected).forEach((val)=>{
            all = all && val;
            some = some || val;
        });
        if (all) {
            setSelectAll("allInPage");
        } else if (some) {
            setSelectAll("some");
        } else {
            setSelectAll("none");
        }
    }, [
        selectAll,
        selected
    ]);
    useEffect(()=>{
        const newCount = selectAll === "allAvailable" ? totalDocs : Object.keys(selected).filter((id)=>selected[id]).length;
        setCount(newCount);
    }, [
        selectAll,
        selected,
        totalDocs
    ]);
    contextRef.current = {
        count,
        getQueryParams,
        selectAll,
        selected,
        setSelection,
        toggleAll,
        totalDocs
    };
    return /*#__PURE__*/ _jsx(Context.Provider, {
        value: contextRef.current,
        children: children
    });
};
export const useSelection = ()=>useContext(Context);

//# sourceMappingURL=index.js.map