import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage';
import { UTApi } from 'uploadthing/server';
import { generateURL } from './generateURL.js';
import { getHandleDelete } from './handleDelete.js';
import { getHandleUpload } from './handleUpload.js';
import { getHandler } from './staticHandler.js';
export const uploadthingStorage = (uploadthingStorageOptions)=>(incomingConfig)=>{
        if (uploadthingStorageOptions.enabled === false) {
            return incomingConfig;
        }
        // Default ACL to public-read
        if (!uploadthingStorageOptions.options.acl) {
            uploadthingStorageOptions.options.acl = 'public-read';
        }
        const adapter = uploadthingInternal(uploadthingStorageOptions, incomingConfig);
        // Add adapter to each collection option object
        const collectionsWithAdapter = Object.entries(uploadthingStorageOptions.collections).reduce((acc, [slug, collOptions])=>({
                ...acc,
                [slug]: {
                    ...collOptions === true ? {} : collOptions,
                    // Disable payload access control if the ACL is public-read or not set
                    // ...(uploadthingStorageOptions.options.acl === 'public-read'
                    //   ? { disablePayloadAccessControl: true }
                    //   : {}),
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
function uploadthingInternal(options, incomingConfig) {
    const fields = [
        {
            name: '_key',
            type: 'text',
            admin: {
                hidden: true
            }
        }
    ];
    return ()=>{
        const { options: { acl = 'public-read', ...utOptions } } = options;
        const utApi = new UTApi(utOptions);
        return {
            name: 'uploadthing',
            fields,
            generateURL,
            handleDelete: getHandleDelete({
                utApi
            }),
            handleUpload: getHandleUpload({
                acl,
                utApi
            }),
            staticHandler: getHandler({
                utApi
            })
        };
    };
}

//# sourceMappingURL=index.js.map