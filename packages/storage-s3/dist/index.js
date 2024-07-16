import * as AWS from '@aws-sdk/client-s3';
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage';
import { getGenerateURL } from './generateURL.js';
import { getHandleDelete } from './handleDelete.js';
import { getHandleUpload } from './handleUpload.js';
import { getHandler } from './staticHandler.js';
export const s3Storage = (s3StorageOptions)=>(incomingConfig)=>{
        if (s3StorageOptions.enabled === false) {
            return incomingConfig;
        }
        const adapter = s3StorageInternal(s3StorageOptions);
        // Add adapter to each collection option object
        const collectionsWithAdapter = Object.entries(s3StorageOptions.collections).reduce((acc, [slug, collOptions])=>({
                ...acc,
                [slug]: {
                    ...collOptions === true ? {} : collOptions,
                    adapter
                }
            }), {});
        // Set disableLocalStorage: true for collections specified in the plugin options
        const config = {
            ...incomingConfig,
            collections: (incomingConfig.collections || []).map((collection)=>{
                if (!collectionsWithAdapter[collection.slug]) {
                    return collection;
                }
                return {
                    ...collection,
                    upload: {
                        ...typeof collection.upload === 'object' ? collection.upload : {},
                        disableLocalStorage: true
                    }
                };
            })
        };
        return cloudStoragePlugin({
            collections: collectionsWithAdapter
        })(config);
    };
function s3StorageInternal({ acl, bucket, config = {} }) {
    return ({ collection, prefix })=>{
        let storageClient = null;
        const getStorageClient = ()=>{
            if (storageClient) return storageClient;
            storageClient = new AWS.S3(config);
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
}

//# sourceMappingURL=index.js.map