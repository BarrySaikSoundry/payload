import type { Collection, Field, PayloadRequest, RichTextField } from 'payload';
import type { AdapterArguments } from '../types.js';
type Arguments = {
    currentDepth?: number;
    data: unknown;
    depth: number;
    draft: boolean;
    field: RichTextField<any[], AdapterArguments, AdapterArguments>;
    key: number | string;
    overrideAccess?: boolean;
    req: PayloadRequest;
    showHiddenFields: boolean;
};
export declare const populate: ({ id, collection, currentDepth, data, depth, draft, key, overrideAccess, req, showHiddenFields, }: {
    collection: Collection;
    field: Field;
    id: string;
} & Omit<Arguments, "field">) => Promise<void>;
export {};
//# sourceMappingURL=populate.d.ts.map