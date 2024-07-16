import type { ContainerClient } from '@azure/storage-blob';
import type { CollectionConfig } from 'payload';
import type { HandleDelete } from '../../types.js';
interface Args {
    collection: CollectionConfig;
    getStorageClient: () => ContainerClient;
}
export declare const getHandleDelete: ({ getStorageClient }: Args) => HandleDelete;
export {};
//# sourceMappingURL=handleDelete.d.ts.map