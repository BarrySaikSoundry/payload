import type { Field, Payload } from 'payload';
type SearchParam = {
    path?: string;
    rawQuery?: unknown;
    value?: unknown;
};
/**
 * Convert the Payload key / value / operator into a MongoDB query
 */
export declare function buildSearchParam({ collectionSlug, fields, globalSlug, incomingPath, locale, operator, payload, val, }: {
    collectionSlug?: string;
    fields: Field[];
    globalSlug?: string;
    incomingPath: string;
    locale?: string;
    operator: string;
    payload: Payload;
    val: unknown;
}): Promise<SearchParam>;
export {};
//# sourceMappingURL=buildSearchParams.d.ts.map