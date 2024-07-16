import * as AWS from '@aws-sdk/client-s3';
import { getGenerateURL } from './generateURL.js';
import { getHandleDelete } from './handleDelete.js';
import { getHandleUpload } from './handleUpload.js';
import { getHandler } from './staticHandler.js';
/**
 * @deprecated Use [`@payloadcms/storage-s3`](https://www.npmjs.com/package/@payloadcms/storage-s3) instead.
 *
 * This adapter has been superceded by `@payloadcms/storage-s3` and will be removed in Payload 3.0.
 */ export const s3Adapter = ({ acl, bucket, config = {} })=>({ collection, prefix })=>{
        if (!AWS) {
            throw new Error('The packages @aws-sdk/client-s3, @aws-sdk/lib-storage and aws-crt are not installed, but are required for the plugin-cloud-storage S3 adapter. Please install them.');
        }
        let storageClient = null;
        const getStorageClient = ()=>{
            if (storageClient) return storageClient;
            try {
                storageClient = new AWS.S3(config);
            } catch (error) {
                if (/is not a constructor$/.test(error.message)) {
                    throw new Error('The packages @aws-sdk/client-s3, @aws-sdk/lib-storage and aws-crt are not installed, but are required for the plugin-cloud-storage S3 adapter. Please install them.');
                }
                // Re-throw other unexpected errors.
                throw error;
            }
            return storageClient;
        };
        return {
            name: 's3',
            generateURL: getGenerateURL({
                bucket,
                config
            }),
            handleDelete: getHandleDelete({
                bucket,
                getStorageClient
            }),
            handleUpload: getHandleUpload({
                acl,
                bucket,
                collection,
                getStorageClient,
                prefix
            }),
            staticHandler: getHandler({
                bucket,
                collection,
                getStorageClient
            })
        };
    };

//# sourceMappingURL=index.js.map