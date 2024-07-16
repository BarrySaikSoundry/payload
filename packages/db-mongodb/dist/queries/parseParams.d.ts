import type { Field, Payload, Where } from 'payload';
export declare function parseParams({ collectionSlug, fields, globalSlug, locale, payload, where, }: {
    collectionSlug?: string;
    fields: Field[];
    globalSlug?: string;
    locale: string;
    payload: Payload;
    where: Where;
}): Promise<Record<string, unknown>>;
//# sourceMappingURL=parseParams.d.ts.map