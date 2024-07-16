import { Storage } from '@google-cloud/storage';
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage';
import { getGenerateURL } from './generateURL.js';
import { getHandleDelete } from './handleDelete.js';
import { getHandleUpload } from './handleUpload.js';
import { getHandler } from './staticHandler.js';
export const gcsStorage = (gcsStorageOptions)=>(incomingConfig)=>{
        if (gcsStorageOptions.enabled === false) {
            return incomingConfig;
        }
        const adapter = gcsStorageInternal(gcsStorageOptions);
        // Add adapter to each collection option object
        const collectionsWithAdapter = Object.entries(gcsStorageOptions.collections).reduce((acc, [slug, collOptions])=>({
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
function gcsStorageInternal({ acl, bucket, options }) {
    return ({ collection, prefix })=>{
        let storageClient = null;
        const getStorageClient = ()=>{
            if (storageClient) return storageClient;
            storageClient = new Storage(options);
            return storageClient;
        };
        return {
            name: 'gcs',
            generateURL: getGenerateURL({
                bucket,
                getStorageClient
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