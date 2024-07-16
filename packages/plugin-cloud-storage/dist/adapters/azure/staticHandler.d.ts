import type { ContainerClient } from '@azure/storage-blob';
import type { CollectionConfig } from 'payload';
import type { StaticHandler } from '../../types.js';
interface Args {
    collection: CollectionConfig;
    getStorageClient: () => ContainerClient;
}
export declare const getHandler: ({ collection, getStorageClient }: Args) => StaticHandler;
export {};
//# sourceMappingURL=staticHandler.d.ts.map