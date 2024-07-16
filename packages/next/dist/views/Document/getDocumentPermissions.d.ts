import type { Data, DocumentPermissions, PayloadRequest, SanitizedCollectionConfig, SanitizedGlobalConfig } from 'payload';
export declare const getDocumentPermissions: (args: {
    collectionConfig?: SanitizedCollectionConfig;
    data: Data;
    globalConfig?: SanitizedGlobalConfig;
    id?: number | string;
    req: PayloadRequest;
}) => Promise<{
    docPermissions: DocumentPermissions;
    hasPublishPermission: boolean;
    hasSavePermission: boolean;
}>;
//# sourceMappingURL=getDocumentPermissions.d.ts.map