import type { Storage } from '@google-cloud/storage';
import type { CollectionConfig } from 'payload';
import type { StaticHandler } from '../../types.js';
interface Args {
    bucket: string;
    collection: CollectionConfig;
    getStorageClient: () => Storage;
}
export declare const getHandler: ({ bucket, collection, getStorageClient }: Args) => StaticHandler;
export {};
//# sourceMappingURL=staticHandler.d.ts.map