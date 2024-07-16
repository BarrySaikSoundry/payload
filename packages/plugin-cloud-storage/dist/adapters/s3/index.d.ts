import * as AWS from '@aws-sdk/client-s3';
import type { Adapter } from '../../types.js';
export interface Args {
    acl?: 'private' | 'public-read';
    /**
     * Bucket name to upload files to.
     *
     * Must follow [AWS S3 bucket naming conventions](https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html).
     */
    bucket: string;
    /**
     * AWS S3 client configuration. Highly dependent on your AWS setup.
     *
     * [AWS.S3ClientConfig Docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/interfaces/s3clientconfig.html)
     */
    config: AWS.S3ClientConfig;
}
/**
 * @deprecated Use [`@payloadcms/storage-s3`](https://www.npmjs.com/package/@payloadcms/storage-s3) instead.
 *
 * This adapter has been superceded by `@payloadcms/storage-s3` and will be removed in Payload 3.0.
 */
export declare const s3Adapter: ({ acl, bucket, config }: Args) => Adapter;
//# sourceMappingURL=index.d.ts.map