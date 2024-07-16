import type { CollectionOptions } from '@payloadcms/plugin-cloud-storage/types';
import type { Plugin } from 'payload';
export type VercelBlobStorageOptions = {
    /**
     * Access control level. Currently, only 'public' is supported.
     * Vercel plans on adding support for private blobs in the future.
     *
     * @default 'public'
     */
    access?: 'public';
    /**
     * Add a random suffix to the uploaded file name in Vercel Blob storage
     *
     * @default false
     */
    addRandomSuffix?: boolean;
    /**
     * Cache-Control max-age in seconds
     *
     * @defaultvalue 365 * 24 * 60 * 60 (1 Year)
     */
    cacheControlMaxAge?: number;
    /**
     * Collections to apply the Vercel Blob adapter to
     */
    collections: Record<string, Omit<CollectionOptions, 'adapter'> | true>;
    /**
     * Whether or not to enable the plugin
     *
     * Default: true
     */
    enabled?: boolean;
    /**
     * Vercel Blob storage read/write token
     *
     * Usually process.env.BLOB_READ_WRITE_TOKEN set by Vercel
     */
    token: string;
};
type VercelBlobStoragePlugin = (vercelBlobStorageOpts: VercelBlobStorageOptions) => Plugin;
export declare const vercelBlobStorage: VercelBlobStoragePlugin;
export {};
//# sourceMappingURL=index.d.ts.map