import type { PaginateOptions } from 'mongoose';
import type { Field, SanitizedConfig } from 'payload';
type Args = {
    config: SanitizedConfig;
    fields: Field[];
    locale: string;
    sort: string;
    timestamps: boolean;
};
export type SortArgs = {
    direction: SortDirection;
    property: string;
}[];
export type SortDirection = 'asc' | 'desc';
export declare const buildSortParam: ({ config, fields, locale, sort, timestamps, }: Args) => PaginateOptions["sort"];
export {};
//# sourceMappingURL=buildSortParam.d.ts.map