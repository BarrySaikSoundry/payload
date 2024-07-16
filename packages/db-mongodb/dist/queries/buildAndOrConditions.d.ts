import type { Field, Payload, Where } from 'payload';
export declare function buildAndOrConditions({ collectionSlug, fields, globalSlug, locale, payload, where, }: {
    collectionSlug?: string;
    fields: Field[];
    globalSlug?: string;
    locale?: string;
    payload: Payload;
    where: Where[];
}): Promise<Record<string, unknown>[]>;
//# sourceMappingURL=buildAndOrConditions.d.ts.map