import type { CollectionConfig } from 'payload';
import type { PluginOptions, StaticHandler } from './types.js';
interface Args {
    cachingOptions?: PluginOptions['uploadCaching'];
    collection: CollectionConfig;
}
export declare const getStaticHandler: ({ cachingOptions, collection }: Args) => StaticHandler;
export {};
//# sourceMappingURL=staticHandler.d.ts.map