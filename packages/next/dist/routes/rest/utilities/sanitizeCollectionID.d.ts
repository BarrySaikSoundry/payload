import type { Payload } from 'payload';
type Args = {
    collectionSlug: string;
    id: string;
    payload: Payload;
};
export declare const sanitizeCollectionID: ({ id, collectionSlug, payload }: Args) => number | string;
export {};
//# sourceMappingURL=sanitizeCollectionID.d.ts.map