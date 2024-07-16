import { deleteFromSearch } from './Search/hooks/deleteFromSearch.js';
import { syncWithSearch } from './Search/hooks/syncWithSearch.js';
import { generateSearchCollection } from './Search/index.js';
export const searchPlugin = (incomingPluginConfig)=>(config)=>{
        const { collections } = config;
        if (collections) {
            const pluginConfig = {
                ...incomingPluginConfig,
                deleteDrafts: true,
                syncDrafts: false
            };
            // add afterChange and afterDelete hooks to every search-enabled collection
            const collectionsWithSearchHooks = config?.collections?.map((collection)=>{
                const { hooks: existingHooks } = collection;
                const enabledCollections = pluginConfig.collections || [];
                const isEnabled = enabledCollections.indexOf(collection.slug) > -1;
                if (isEnabled) {
                    return {
                        ...collection,
                        hooks: {
                            ...collection.hooks,
                            afterChange: [
                                ...existingHooks?.afterChange || [],
                                async (args)=>{
                                    await syncWithSearch({
                                        ...args,
                                        collection: collection.slug,
                                        pluginConfig
                                    });
                                }
                            ],
                            afterDelete: [
                                ...existingHooks?.afterDelete || [],
                                deleteFromSearch
                            ]
                        }
                    };
                }
                return collection;
            }).filter(Boolean);
            return {
                ...config,
                collections: [
                    ...collectionsWithSearchHooks || [],
                    generateSearchCollection(pluginConfig)
                ]
            };
        }
        return config;
    };

//# sourceMappingURL=index.js.map