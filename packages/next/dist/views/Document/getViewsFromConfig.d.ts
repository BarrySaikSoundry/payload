import type { AdminViewComponent, CollectionPermission, EditViewComponent, GlobalPermission, SanitizedCollectionConfig, SanitizedConfig, SanitizedGlobalConfig } from 'payload';
export declare const getViewsFromConfig: ({ collectionConfig, config, docPermissions, globalConfig, routeSegments, }: {
    collectionConfig?: SanitizedCollectionConfig;
    config: SanitizedConfig;
    docPermissions: CollectionPermission | GlobalPermission;
    globalConfig?: SanitizedGlobalConfig;
    routeSegments: string[];
}) => {
    CustomView: EditViewComponent;
    DefaultView: EditViewComponent;
    /**
     * The error view to display if CustomView or DefaultView do not exist (could be either due to not found, or unauthorized). Can be null
     */
    ErrorView: AdminViewComponent;
} | null;
//# sourceMappingURL=getViewsFromConfig.d.ts.map