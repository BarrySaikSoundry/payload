import type { CollectionPermission, GlobalPermission, PayloadRequest, SanitizedGlobalConfig } from 'payload';
export type Resolver = (_: unknown, context: {
    req: PayloadRequest;
}) => Promise<CollectionPermission | GlobalPermission>;
export declare function docAccessResolver(global: SanitizedGlobalConfig): Resolver;
//# sourceMappingURL=docAccess.d.ts.map