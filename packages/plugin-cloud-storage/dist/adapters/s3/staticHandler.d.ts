import type * as AWS from '@aws-sdk/client-s3';
import type { CollectionConfig } from 'payload';
import type { StaticHandler } from '../../types.js';
interface Args {
    bucket: string;
    collection: CollectionConfig;
    getStorageClient: () => AWS.S3;
}
export declare const getHandler: ({ bucket, collection, getStorageClient }: Args) => StaticHandler;
export {};
//# sourceMappingURL=staticHandler.d.ts.map