import type { PayloadRequest } from 'payload';
type Arguments = {
    currentDepth?: number;
    data: unknown;
    depth: number;
    draft: boolean;
    key: number | string;
    overrideAccess: boolean;
    req: PayloadRequest;
    showHiddenFields: boolean;
};
export declare const populate: ({ id, collectionSlug, currentDepth, data, depth, draft, key, overrideAccess, req, showHiddenFields, }: {
    collectionSlug: string;
    id: number | string;
} & Arguments) => Promise<void>;
export {};
//# sourceMappingURL=populate.d.ts.map