import type { CollectionAfterChangeHook, CollectionConfig, Field, Payload, PayloadRequest } from 'payload';
export type DocToSync = {
    [key: string]: any;
    doc: {
        relationTo: string;
        value: string;
    };
    title: string;
};
export type BeforeSync = (args: {
    originalDoc: {
        [key: string]: any;
    };
    payload: Payload;
    req: PayloadRequest;
    searchDoc: DocToSync;
}) => DocToSync | Promise<DocToSync>;
export type FieldsOverride = (args: {
    defaultFields: Field[];
}) => Field[];
export type SearchPluginConfig = {
    beforeSync?: BeforeSync;
    collections?: string[];
    defaultPriorities?: {
        [collection: string]: ((doc: any) => Promise<number> | number) | number;
    };
    deleteDrafts?: boolean;
    searchOverrides?: {
        fields?: FieldsOverride;
    } & Partial<Omit<CollectionConfig, 'fields'>>;
    syncDrafts?: boolean;
};
export type SyncWithSearch = (Args: {
    collection: string;
    pluginConfig: SearchPluginConfig;
} & Omit<Parameters<CollectionAfterChangeHook>[0], 'collection'>) => ReturnType<CollectionAfterChangeHook>;
//# sourceMappingURL=types.d.ts.map