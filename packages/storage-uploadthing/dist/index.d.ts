import type { CollectionOptions } from '@payloadcms/plugin-cloud-storage/types';
import type { Plugin } from 'payload';
import type { UTApiOptions } from 'uploadthing/types';
export type UploadthingStorageOptions = {
    /**
     * Collection options to apply the adapter to.
     */
    collections: Record<string, Omit<CollectionOptions, 'adapter'> | true>;
    /**
     * Whether or not to enable the plugin
     *
     * Default: true
     */
    enabled?: boolean;
    /**
     * Uploadthing Options
     */
    options: {
        /**
         * @default 'public-read'
         */
        acl?: ACL;
    } & UTApiOptions;
};
type UploadthingPlugin = (uploadthingStorageOptions: UploadthingStorageOptions) => Plugin;
/** NOTE: not synced with uploadthing's internal types. Need to modify if more options added */
export type ACL = 'private' | 'public-read';
export declare const uploadthingStorage: UploadthingPlugin;
export {};
//# sourceMappingURL=index.d.ts.map