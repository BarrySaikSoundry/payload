import type { FilterOptions, FilterOptionsProps, Where } from 'payload';
export declare const getFilterOptionsQuery: (filterOptions: FilterOptions, options: {
    relationTo: string | string[];
} & Omit<FilterOptionsProps, "relationTo">) => Promise<{
    [collection: string]: Where;
}>;
//# sourceMappingURL=getFilterOptionsQuery.d.ts.map