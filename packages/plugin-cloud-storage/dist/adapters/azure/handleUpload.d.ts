import type { ContainerClient } from '@azure/storage-blob';
import type { CollectionConfig } from 'payload';
import type { HandleUpload } from '../../types.js';
interface Args {
    collection: CollectionConfig;
    getStorageClient: () => ContainerClient;
    prefix?: string;
}
export declare const getHandleUpload: ({ getStorageClient, prefix }: Args) => HandleUpload;
export {};
//# sourceMappingURL=handleUpload.d.ts.map