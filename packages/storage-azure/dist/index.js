import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage';
import { getGenerateURL } from './generateURL.js';
import { getHandleDelete } from './handleDelete.js';
import { getHandleUpload } from './handleUpload.js';
import { getHandler } from './staticHandler.js';
import { getStorageClient as getStorageClientFunc } from './utils/getStorageClient.js';
export const azureStorage = (azureStorageOptions)=>(incomingConfig)=>{
        if (azureStorageOptions.enabled === false) {
            return incomingConfig;
        }
        const adapter = azureStorageInternal(azureStorageOptions);
        // Add adapter to each collection option object
        const collectionsWithAdapter = Object.entries(azureStorageOptions.collections).reduce((acc, [slug, collOptions])=>({
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
function azureStorageInternal({ allowContainerCreate, baseURL, connectionString, containerName }) {
    const createContainerIfNotExists = ()=>{
        void getStorageClientFunc({
            connectionString,
            containerName
        }).createIfNotExists({
            access: 'blob'
        });
    };
    const getStorageClient = ()=>getStorageClientFunc({
            connectionString,
            containerName
        });
    return ({ collection, prefix })=>{
        return {
            name: 'azure',
            generateURL: getGenerateURL({
                baseURL,
                containerName
            }),
            handleDelete: getHandleDelete({
                collection,
                getStorageClient
            }),
            handleUpload: getHandleUpload({
                collection,
                getStorageClient,
                prefix
            }),
            staticHandler: getHandler({
                collection,
                getStorageClient
            }),
            ...allowContainerCreate && {
                onInit: createContainerIfNotExists
            }
        };
    };
}
export { getStorageClientFunc as getStorageClient };

//# sourceMappingURL=index.js.map