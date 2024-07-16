import type { Collection, CollectionPermission, GlobalPermission, PayloadRequest } from 'payload';
export type Resolver = (_: unknown, args: {
    id: number | string;
}, context: {
    req: PayloadRequest;
}) => Promise<CollectionPermission | GlobalPermission>;
export declare function docAccessResolver(collection: Collection): Resolver;
//# sourceMappingURL=docAccess.d.ts.map