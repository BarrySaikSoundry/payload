import type { AuthOperationsFromCollectionSlug, Collection, DataFromCollectionSlug } from '../../collections/config/types.js';
import type { CollectionSlug } from '../../index.js';
import type { PayloadRequest } from '../../types/index.js';
import type { User } from '../types.js';
export type Result = {
    exp?: number;
    token?: string;
    user?: User;
};
export type Arguments<TSlug extends CollectionSlug> = {
    collection: Collection;
    data: AuthOperationsFromCollectionSlug<TSlug>['login'];
    depth?: number;
    overrideAccess?: boolean;
    req: PayloadRequest;
    showHiddenFields?: boolean;
};
export declare const loginOperation: <TSlug extends CollectionSlug>(incomingArgs: Arguments<TSlug>) => Promise<{
    user: DataFromCollectionSlug<TSlug>;
} & Result>;
//# sourceMappingURL=login.d.ts.map