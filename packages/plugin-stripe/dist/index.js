import { getFields } from './fields/getFields.js';
import { createNewInStripe } from './hooks/createNewInStripe.js';
import { deleteFromStripe } from './hooks/deleteFromStripe.js';
import { syncExistingWithStripe } from './hooks/syncExistingWithStripe.js';
import { stripeREST } from './routes/rest.js';
import { stripeWebhooks } from './routes/webhooks.js';
export { LinkToDoc } from './ui/LinkToDoc.js';
export { stripeProxy } from './utilities/stripeProxy.js';
export const stripePlugin = (incomingStripeConfig)=>(config)=>{
        const { collections } = config;
        // set config defaults here
        const pluginConfig = {
            ...incomingStripeConfig,
            rest: incomingStripeConfig?.rest ?? false,
            sync: incomingStripeConfig?.sync || []
        };
        // NOTE: env variables are never passed to the client, but we need to know if `stripeSecretKey` is a test key
        // unfortunately we must set the 'isTestKey' property on the config instead of using the following code:
        // const isTestKey = stripeConfig.stripeSecretKey?.startsWith('sk_test_');
        const endpoints = [
            ...config?.endpoints || [],
            {
                handler: async (req)=>{
                    const res = await stripeWebhooks({
                        config,
                        pluginConfig,
                        req
                    });
                    return res;
                },
                method: 'post',
                path: '/stripe/webhooks'
            }
        ];
        if (incomingStripeConfig?.rest) {
            endpoints.push({
                handler: async (req)=>{
                    const res = await stripeREST({
                        pluginConfig,
                        req
                    });
                    return res;
                },
                method: 'post',
                path: '/stripe/rest'
            });
        }
        return {
            ...config,
            collections: collections?.map((collection)=>{
                const { hooks: existingHooks } = collection;
                const syncConfig = pluginConfig.sync?.find((sync)=>sync.collection === collection.slug);
                if (syncConfig) {
                    const fields = getFields({
                        collection,
                        pluginConfig,
                        syncConfig
                    });
                    return {
                        ...collection,
                        fields,
                        hooks: {
                            ...collection.hooks,
                            afterDelete: [
                                ...existingHooks?.afterDelete || [],
                                (args)=>deleteFromStripe({
                                        ...args,
                                        collection,
                                        pluginConfig
                                    })
                            ],
                            beforeChange: [
                                ...existingHooks?.beforeChange || [],
                                (args)=>syncExistingWithStripe({
                                        ...args,
                                        collection,
                                        pluginConfig
                                    })
                            ],
                            beforeValidate: [
                                ...existingHooks?.beforeValidate || [],
                                (args)=>createNewInStripe({
                                        ...args,
                                        collection,
                                        pluginConfig
                                    })
                            ]
                        }
                    };
                }
                return collection;
            }),
            endpoints
        };
    };

//# sourceMappingURL=index.js.map