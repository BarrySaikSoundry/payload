import type { CollectionSlug, Field } from 'payload';
import type { UploadFeaturePropsClient } from './feature.client.js';
export type UploadFeatureProps = {
    collections?: {
        [collection: CollectionSlug]: {
            fields: Field[];
        };
    };
    /**
     * Sets a maximum population depth for this upload (not the fields for this upload), regardless of the remaining depth when the respective field is reached.
     * This behaves exactly like the maxDepth properties of relationship and upload fields.
     *
     * {@link https://payloadcms.com/docs/getting-started/concepts#field-level-max-depth}
     */
    maxDepth?: number;
};
export declare const UploadFeature: import("../typesServer.js").FeatureProviderProviderServer<UploadFeatureProps, UploadFeatureProps, UploadFeaturePropsClient>;
//# sourceMappingURL=feature.server.d.ts.map