import type { HandleUpload } from '@payloadcms/plugin-cloud-storage/types';
import type { VercelBlobAdapterUploadOptions } from './index.js';
type HandleUploadArgs = {
    baseUrl: string;
    prefix?: string;
    token: string;
} & VercelBlobAdapterUploadOptions;
export declare const getHandleUpload: ({ access, addRandomSuffix, baseUrl, cacheControlMaxAge, prefix, token, }: HandleUploadArgs) => HandleUpload;
export {};
//# sourceMappingURL=handleUpload.d.ts.map