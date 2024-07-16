import type { Storage } from '@google-cloud/storage';
import type { HandleDelete } from '../../types.js';
interface Args {
    bucket: string;
    getStorageClient: () => Storage;
}
export declare const getHandleDelete: ({ bucket, getStorageClient }: Args) => HandleDelete;
export {};
//# sourceMappingURL=handleDelete.d.ts.map