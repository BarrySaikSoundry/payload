import type { Adapter } from '@payloadcms/plugin-cloud-storage/types';
export interface VercelBlobAdapterArgs {
    options?: VercelBlobAdapterUploadOptions;
    /**
     * Vercel Blob storage read/write token
     *
     * Usually process.env.BLOB_READ_WRITE_TOKEN set by Vercel
     */
    token: string;
}
export interface VercelBlobAdapterUploadOptions {
    /**
     * Access control level
     *
     * @default 'public'
     */
    access?: 'public';
    /**
     * Add a random suffix to the uploaded file name
     *
     * @default false
     */
    addRandomSuffix?: boolean;
    /**
     * Cache-Control max-age in seconds
     *
     * @default 31536000 (1 year)
     */
    cacheControlMaxAge?: number;
}
/**
 * @deprecated Use [`@payloadcms/storage-vercel-blob`](https://www.npmjs.com/package/@payloadcms/storage-vercel-blob) instead.
 *
 * This adapter has been superceded by `@payloadcms/storage-vercel-blob` and will be removed in Payload 3.0.
 */
export declare const vercelBlobAdapter: ({ options, token }: VercelBlobAdapterArgs) => Adapter;
//# sourceMappingURL=index.d.ts.map