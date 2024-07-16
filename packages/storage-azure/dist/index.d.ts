import type { CollectionOptions } from '@payloadcms/plugin-cloud-storage/types';
import type { Plugin } from 'payload';
import { getStorageClient as getStorageClientFunc } from './utils/getStorageClient.js';
export type AzureStorageOptions = {
    /**
     * Whether or not to allow the container to be created if it does not exist
     *
     * @default false
     */
    allowContainerCreate: boolean;
    /**
     * Base URL for the Azure Blob storage account
     */
    baseURL: string;
    /**
     * Collection options to apply the Azure Blob adapter to.
     */
    collections: Record<string, Omit<CollectionOptions, 'adapter'> | true>;
    /**
     * Azure Blob storage connection string
     */
    connectionString: string;
    /**
     * Azure Blob storage container name
     */
    containerName: string;
    /**
     * Whether or not to enable the plugin
     *
     * Default: true
     */
    enabled?: boolean;
};
type AzureStoragePlugin = (azureStorageArgs: AzureStorageOptions) => Plugin;
export declare const azureStorage: AzureStoragePlugin;
export { getStorageClientFunc as getStorageClient };
//# sourceMappingURL=index.d.ts.map