import type { StorageOptions } from '@google-cloud/storage';
import type { Adapter } from '../../types.js';
export interface Args {
    acl?: 'Private' | 'Public';
    bucket: string;
    options: StorageOptions;
}
/**
 * @deprecated Use [`@payloadcms/storage-gcs`](https://www.npmjs.com/package/@payloadcms/storage-gcs) instead.
 *
 * This adapter has been superceded by `@payloadcms/storage-gcs` and will be removed in Payload 3.0.
 */
export declare const gcsAdapter: ({ acl, bucket, options }: Args) => Adapter;
//# sourceMappingURL=index.d.ts.map