import type { Storage } from '@google-cloud/storage';
import type { CollectionConfig } from 'payload';
import type { HandleUpload } from '../../types.js';
interface Args {
    acl?: 'Private' | 'Public';
    bucket: string;
    collection: CollectionConfig;
    getStorageClient: () => Storage;
    prefix?: string;
}
export declare const getHandleUpload: ({ acl, bucket, getStorageClient, prefix, }: Args) => HandleUpload;
export {};
//# sourceMappingURL=handleUpload.d.ts.map