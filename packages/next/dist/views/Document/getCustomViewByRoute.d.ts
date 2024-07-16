import type { EditViewComponent, SanitizedCollectionConfig, SanitizedGlobalConfig } from 'payload';
export declare const getCustomViewByRoute: ({ baseRoute, currentRoute, views, }: {
    baseRoute: string;
    currentRoute: string;
    views: SanitizedCollectionConfig["admin"]["components"]["views"] | SanitizedGlobalConfig["admin"]["components"]["views"];
}) => EditViewComponent;
//# sourceMappingURL=getCustomViewByRoute.d.ts.map