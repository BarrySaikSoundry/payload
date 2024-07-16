import type { Adapter } from '../../types.js';
export interface Args {
    allowContainerCreate: boolean;
    baseURL: string;
    connectionString: string;
    containerName: string;
}
/**
 * @deprecated Use [`@payloadcms/azure`](https://www.npmjs.com/package/@payloadcms/azure) instead.
 *
 * This adapter has been superceded by `@payloadcms/azure` and will be removed in Payload 3.0.
 */
export declare const azureBlobStorageAdapter: ({ allowContainerCreate, baseURL, connectionString, containerName, }: Args) => Adapter;
//# sourceMappingURL=index.d.ts.map