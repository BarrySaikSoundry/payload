import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage';
import { getGenerateUrl } from './generateURL.js';
import { getHandleDelete } from './handleDelete.js';
import { getHandleUpload } from './handleUpload.js';
import { getStaticHandler } from './staticHandler.js';
const defaultUploadOptions = {
    access: 'public',
    addRandomSuffix: false,
    cacheControlMaxAge: 60 * 60 * 24 * 365,
    enabled: true
};
export const vercelBlobStorage = (options)=>(incomingConfig)=>{
        if (options.enabled === false) {
            return incomingConfig;
        }
        if (!options.token) {
            throw new Error('The token argument is required for the Vercel Blob adapter.');
        }
        // Parse storeId from token
        const storeId = options.token.match(/^vercel_blob_rw_([a-z\d]+)_[a-z\d]+$/i)?.[1]?.toLowerCase();
        if (!storeId) {
            throw new Error('Invalid token format for Vercel Blob adapter. Should be vercel_blob_rw_<store_id>_<random_string>.');
        }
        const optionsWithDefaults = {
            ...defaultUploadOptions,
            ...options
        };
        const baseUrl = `https://${storeId}.${optionsWithDefaults.access}.blob.vercel-storage.com`;
        const adapter = vercelBlobStorageInternal({
            ...optionsWithDefaults,
            baseUrl
        });
        // Add adapter to each collection option object
        const collectionsWithAdapter = Object.entries(options.collections).reduce((acc, [slug, collOptions])=>({
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
function vercelBlobStorageInternal(options) {
    return ({ collection, prefix })=>{
        const { access, addRandomSuffix, baseUrl, cacheControlMaxAge, token } = options;
        return {
            name: 'vercel-blob',
            generateURL: getGenerateUrl({
                baseUrl,
                prefix
            }),
            handleDelete: getHandleDelete({
                baseUrl,
                prefix,
                token: options.token
            }),
            handleUpload: getHandleUpload({
                access,
                addRandomSuffix,
                baseUrl,
                cacheControlMaxAge,
                prefix,
                token
            }),
            staticHandler: getStaticHandler({
                baseUrl,
                token
            }, collection)
        };
    };
}

//# sourceMappingURL=index.js.map