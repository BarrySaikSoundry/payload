import type { CollectionConfig, Field } from 'payload';
import type { GenerateFileURL, GeneratedAdapter } from '../types.js';
interface Args {
    adapter: GeneratedAdapter;
    collection: CollectionConfig;
    disablePayloadAccessControl?: true;
    generateFileURL?: GenerateFileURL;
    prefix?: string;
}
export declare const getFields: ({ adapter, collection, disablePayloadAccessControl, generateFileURL, prefix, }: Args) => Field[];
export {};
//# sourceMappingURL=getFields.d.ts.map