import type { CollectionSlug } from '../../index.js';
import type { PayloadRequest } from '../../types/index.js';
import type { Collection, DataFromCollectionSlug } from '../config/types.js';
export type Arguments = {
    collection: Collection;
    depth?: number;
    id: number | string;
    overrideAccess?: boolean;
    req: PayloadRequest;
    showHiddenFields?: boolean;
};
export declare const deleteByIDOperation: <TSlug extends CollectionSlug>(incomingArgs: Arguments) => Promise<DataFromCollectionSlug<TSlug>>;
//# sourceMappingURL=deleteByID.d.ts.map