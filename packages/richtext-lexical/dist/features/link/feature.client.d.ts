import type { ExclusiveLinkCollectionsProps } from './feature.server.js';
export type ClientProps = ExclusiveLinkCollectionsProps;
export declare const LinkFeatureClient: import("react").FC<({
    featureKey: string;
    order: number;
} & {
    disabledCollections?: import("packages/payload/src/index.js").CollectionSlug[];
    enabledCollections?: never;
}) | ({
    featureKey: string;
    order: number;
} & {
    disabledCollections?: never;
    enabledCollections?: import("packages/payload/src/index.js").CollectionSlug[];
})>;
//# sourceMappingURL=feature.client.d.ts.map