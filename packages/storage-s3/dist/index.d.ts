import type { CollectionOptions } from '@payloadcms/plugin-cloud-storage/types';
import type { Plugin } from 'payload';
import * as AWS from '@aws-sdk/client-s3';
export type S3StorageOptions = {
    /**
     * Access control list for uploaded files.
     */
    acl?: 'private' | 'public-read';
    /**
     * Bucket name to upload files to.
     *
     * Must follow [AWS S3 bucket naming conventions](https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html).
     */
    bucket: string;
    /**
     * Collection options to apply the S3 adapter to.
     */
    collections: Record<string, Omit<CollectionOptions, 'adapter'> | true>;
    /**
     * AWS S3 client configuration. Highly dependent on your AWS setup.
     *
     * [AWS.S3ClientConfig Docs](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/interfaces/s3clientconfig.html)
     */
    config: AWS.S3ClientConfig;
    /**
     * Whether or not to disable local storage
     *
     * @default true
     */
    disableLocalStorage?: boolean;
    /**
     * Whether or not to enable the plugin
     *
     * Default: true
     */
    enabled?: boolean;
};
type S3StoragePlugin = (storageS3Args: S3StorageOptions) => Plugin;
export declare const s3Storage: S3StoragePlugin;
export {};
//# sourceMappingURL=index.d.ts.map