import type { StorageOptions } from '@google-cloud/storage';
import type { CollectionOptions } from '@payloadcms/plugin-cloud-storage/types';
import type { Plugin } from 'payload';
export interface GcsStorageOptions {
    acl?: 'Private' | 'Public';
    /**
     * The name of the bucket to use.
     */
    bucket: string;
    /**
     * Collection options to apply the S3 adapter to.
     */
    collections: Record<string, Omit<CollectionOptions, 'adapter'> | true>;
    /**
     * Whether or not to enable the plugin
     *
     * Default: true
     */
    enabled?: boolean;
    /**
     * Google Cloud Storage client configuration.
     *
     * @see https://github.com/googleapis/nodejs-storage
     */
    options: StorageOptions;
}
type GcsStoragePlugin = (gcsStorageArgs: GcsStorageOptions) => Plugin;
export declare const gcsStorage: GcsStoragePlugin;
export {};
//# sourceMappingURL=index.d.ts.map