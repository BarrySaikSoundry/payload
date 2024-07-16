import type { PaginatedDocs, Where } from 'payload';
import React from 'react';
import type { Column } from '../../elements/Table/index.js';
export type ColumnPreferences = Pick<Column, 'accessor' | 'active'>[];
type Handlers = {
    handlePageChange?: (page: number) => void;
    handlePerPageChange?: (limit: number) => void;
    handleSearchChange?: (search: string) => void;
    handleSortChange?: (sort: string) => void;
    handleWhereChange?: (where: Where) => void;
};
export type ListQueryProps = {
    children: React.ReactNode;
    data: PaginatedDocs;
    defaultLimit?: number;
    defaultSort?: string;
    modifySearchParams?: boolean;
    preferenceKey?: string;
} & Handlers;
export type ListQueryContext = {
    data: PaginatedDocs;
    defaultLimit?: number;
    defaultSort?: string;
    refineListData: (args: RefineOverrides) => void;
} & Handlers;
export declare const useListQuery: () => ListQueryContext;
type RefineOverrides = {
    limit?: string;
    page?: string;
    search?: string;
    sort?: string;
    where?: Where;
};
export declare const ListQueryProvider: React.FC<ListQueryProps>;
export {};
//# sourceMappingURL=index.d.ts.map