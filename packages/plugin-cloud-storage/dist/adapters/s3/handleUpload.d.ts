import type * as AWS from '@aws-sdk/client-s3';
import type { CollectionConfig } from 'payload';
import type { HandleUpload } from '../../types.js';
interface Args {
    acl?: 'private' | 'public-read';
    bucket: string;
    collection: CollectionConfig;
    getStorageClient: () => AWS.S3;
    prefix?: string;
}
export declare const getHandleUpload: ({ acl, bucket, getStorageClient, prefix, }: Args) => HandleUpload;
export {};
//# sourceMappingURL=handleUpload.d.ts.map