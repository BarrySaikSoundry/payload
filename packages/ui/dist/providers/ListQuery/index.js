'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useRouter } from 'next/navigation.js';
import { isNumber } from 'payload/shared';
import * as qs from 'qs-esm';
import React, { createContext, useContext } from 'react';
import { usePreferences } from '../Preferences/index.js';
import { useSearchParams } from '../SearchParams/index.js';
const Context = /*#__PURE__*/ createContext({});
export const useListQuery = ()=>useContext(Context);
export const ListQueryProvider = ({ children, data, defaultLimit, defaultSort, handlePageChange: handlePageChangeFromProps, handlePerPageChange: handlePerPageChangeFromProps, handleSearchChange: handleSearchChangeFromProps, handleSortChange: handleSortChangeFromProps, handleWhereChange: handleWhereChangeFromProps, modifySearchParams, preferenceKey })=>{
    const router = useRouter();
    const { setPreference } = usePreferences();
    const hasSetInitialParams = React.useRef(false);
    const { searchParams: currentQuery } = useSearchParams();
    const refineListData = React.useCallback(async (query)=>{
        if (!modifySearchParams) return;
        const updatedPreferences = {};
        let updatePreferences = false;
        if ('limit' in query) {
            updatedPreferences.limit = query.limit;
            updatePreferences = true;
        }
        if ('sort' in query) {
            updatedPreferences.sort = query.sort;
            updatePreferences = true;
        }
        if (updatePreferences && preferenceKey) {
            await setPreference(preferenceKey, updatedPreferences);
        }
        const params = {
            limit: 'limit' in query ? query.limit : currentQuery?.limit,
            page: 'page' in query ? query.page : currentQuery?.page,
            search: 'search' in query ? query.search : currentQuery?.search,
            sort: 'sort' in query ? query.sort : currentQuery?.sort,
            where: 'where' in query ? query.where : currentQuery?.where
        };
        router.replace(`${qs.stringify(params, {
            addQueryPrefix: true
        })}`);
    }, [
        preferenceKey,
        modifySearchParams,
        router,
        setPreference,
        currentQuery
    ]);
    const handlePageChange = React.useCallback(async (arg)=>{
        if (typeof handlePageChangeFromProps === 'function') {
            handlePageChangeFromProps(arg);
        }
        await refineListData({
            page: String(arg)
        });
    }, [
        refineListData,
        handlePageChangeFromProps
    ]);
    const handlePerPageChange = React.useCallback(async (arg)=>{
        if (typeof handlePerPageChangeFromProps === 'function') {
            handlePerPageChangeFromProps(arg);
        }
        await refineListData({
            limit: String(arg)
        });
    }, [
        refineListData,
        handlePerPageChangeFromProps
    ]);
    const handleSearchChange = React.useCallback(async (arg)=>{
        if (typeof handleSearchChangeFromProps === 'function') {
            handleSearchChangeFromProps(arg);
        }
        await refineListData({
            search: arg
        });
    }, [
        refineListData,
        handleSearchChangeFromProps
    ]);
    const handleSortChange = React.useCallback(async (arg)=>{
        if (typeof handleSortChangeFromProps === 'function') {
            handleSortChangeFromProps(arg);
        }
        await refineListData({
            sort: arg
        });
    }, [
        refineListData,
        handleSortChangeFromProps
    ]);
    const handleWhereChange = React.useCallback(async (arg)=>{
        if (typeof handleWhereChangeFromProps === 'function') {
            handleWhereChangeFromProps(arg);
        }
        await refineListData({
            where: arg
        });
    }, [
        refineListData,
        handleWhereChangeFromProps
    ]);
    React.useEffect(()=>{
        if (!hasSetInitialParams.current) {
            if (modifySearchParams) {
                let shouldUpdateQueryString = false;
                if (isNumber(defaultLimit) && !('limit' in currentQuery)) {
                    currentQuery.limit = String(defaultLimit);
                    shouldUpdateQueryString = true;
                }
                if (defaultSort && !('sort' in currentQuery)) {
                    currentQuery.sort = defaultSort;
                    shouldUpdateQueryString = true;
                }
                if (shouldUpdateQueryString) {
                    router.replace(`?${qs.stringify(currentQuery)}`);
                }
            }
            hasSetInitialParams.current = true;
        }
    }, [
        defaultSort,
        defaultLimit,
        router,
        modifySearchParams,
        currentQuery
    ]);
    return /*#__PURE__*/ _jsx(Context.Provider, {
        value: {
            data,
            handlePageChange,
            handlePerPageChange,
            handleSearchChange,
            handleSortChange,
            handleWhereChange,
            refineListData
        },
        children: children
    });
};

//# sourceMappingURL=index.js.map