'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React, { createContext, useCallback, useContext, useState } from 'react';
import { useComponentMap } from '../../providers/ComponentMap/index.js';
import { useConfig } from '../../providers/Config/index.js';
import { usePreferences } from '../../providers/Preferences/index.js';
import { buildColumnState } from './buildColumnState.js';
import { filterFields } from './filterFields.js';
import { getInitialColumns } from './getInitialColumns.js';
export const TableColumnContext = /*#__PURE__*/ createContext({});
export const useTableColumns = ()=>useContext(TableColumnContext);
export const TableColumnsProvider = ({ cellProps, children, collectionSlug, enableRowSelections = false, listPreferences, preferenceKey })=>{
    const config = useConfig();
    const { componentMap } = useComponentMap();
    const { fieldMap } = componentMap.collections[collectionSlug];
    const collectionConfig = config.collections.find((collectionConfig)=>collectionConfig.slug === collectionSlug);
    const { admin: { defaultColumns, useAsTitle } } = collectionConfig;
    const prevCollection = React.useRef(collectionSlug);
    const { getPreference, setPreference } = usePreferences();
    const [initialColumns] = useState(()=>getInitialColumns(filterFields(fieldMap), useAsTitle, defaultColumns));
    const [tableColumns, setTableColumns] = React.useState(()=>buildColumnState({
            cellProps,
            columnPreferences: listPreferences?.columns,
            columns: initialColumns,
            enableRowSelections,
            fieldMap,
            useAsTitle
        }));
    const updateColumnPreferences = React.useCallback((newColumns)=>{
        const columns = newColumns.map((c)=>({
                accessor: c?.accessor,
                active: c?.active
            }));
        void setPreference(preferenceKey, {
            columns
        }, true);
    }, [
        preferenceKey,
        setPreference
    ]);
    const reassignLinkColumn = (columns)=>{
        let foundFirstActive = false;
        const newColumns = columns.map((col)=>{
            const linkColumn = col.active && !foundFirstActive && col.accessor !== '_select';
            if (linkColumn) foundFirstActive = true;
            return {
                ...col,
                cellProps: {
                    ...col.cellProps,
                    link: linkColumn
                }
            };
        });
        return newColumns;
    };
    const moveColumn = useCallback((args)=>{
        const { fromIndex, toIndex } = args;
        const withMovedColumn = [
            ...tableColumns
        ];
        const [columnToMove] = withMovedColumn.splice(fromIndex, 1);
        withMovedColumn.splice(toIndex, 0, columnToMove);
        const newColumns = reassignLinkColumn(withMovedColumn);
        setTableColumns(newColumns);
        updateColumnPreferences(newColumns);
    }, [
        tableColumns,
        updateColumnPreferences
    ]);
    const toggleColumn = useCallback((column)=>{
        const toggledColumns = tableColumns.map((col)=>{
            return {
                ...col,
                active: col?.name === column ? !col.active : col.active
            };
        });
        const newColumns = reassignLinkColumn(toggledColumns);
        setTableColumns(newColumns);
        updateColumnPreferences(newColumns);
    }, [
        tableColumns,
        updateColumnPreferences
    ]);
    const setActiveColumns = React.useCallback((activeColumnAccessors)=>{
        const activeColumns = tableColumns.map((col)=>{
            return {
                ...col,
                active: activeColumnAccessors.includes(col.accessor)
            };
        });
        const newColumns = reassignLinkColumn(activeColumns);
        updateColumnPreferences(newColumns);
    }, [
        tableColumns,
        updateColumnPreferences
    ]);
    // //////////////////////////////////////////////
    // Get preferences on collection change (drawers)
    // //////////////////////////////////////////////
    React.useEffect(()=>{
        const sync = async ()=>{
            const collectionHasChanged = prevCollection.current !== collectionSlug;
            if (collectionHasChanged || !listPreferences) {
                const currentPreferences = await getPreference(preferenceKey);
                prevCollection.current = collectionSlug;
                if (currentPreferences?.columns) {
                    setTableColumns(buildColumnState({
                        cellProps,
                        columnPreferences: currentPreferences?.columns,
                        columns: initialColumns,
                        enableRowSelections: true,
                        fieldMap,
                        useAsTitle
                    }));
                }
            }
        };
        void sync();
    }, [
        preferenceKey,
        getPreference,
        collectionSlug,
        fieldMap,
        cellProps,
        defaultColumns,
        useAsTitle,
        listPreferences,
        initialColumns
    ]);
    return /*#__PURE__*/ _jsx(TableColumnContext.Provider, {
        value: {
            columns: tableColumns,
            moveColumn,
            setActiveColumns,
            toggleColumn
        },
        children: children
    });
};

//# sourceMappingURL=index.js.map