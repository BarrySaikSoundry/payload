import { getBeforeChangeHook } from './hooks/beforeChange.js';
const traverseFields = ({ config, fields })=>{
    return fields.map((field)=>{
        if (field.type === 'relationship' || field.type === 'upload') {
            return {
                ...field,
                hooks: {
                    ...field.hooks || {},
                    beforeChange: [
                        ...field.hooks?.beforeChange || [],
                        getBeforeChangeHook({
                            config,
                            field
                        })
                    ]
                }
            };
        }
        if ('fields' in field) {
            return {
                ...field,
                fields: traverseFields({
                    config,
                    fields: field.fields
                })
            };
        }
        if (field.type === 'tabs') {
            return {
                ...field,
                tabs: field.tabs.map((tab)=>{
                    return {
                        ...tab,
                        fields: traverseFields({
                            config,
                            fields: tab.fields
                        })
                    };
                })
            };
        }
        if (field.type === 'blocks') {
            return {
                ...field,
                blocks: field.blocks.map((block)=>{
                    return {
                        ...block,
                        fields: traverseFields({
                            config,
                            fields: block.fields
                        })
                    };
                })
            };
        }
        return field;
    });
};
export const relationshipsAsObjectID = ()=>(config)=>{
        return {
            ...config,
            collections: (config.collections || []).map((collection)=>{
                return {
                    ...collection,
                    fields: traverseFields({
                        config,
                        fields: collection.fields
                    })
                };
            }),
            globals: (config.globals || []).map((global)=>{
                return {
                    ...global,
                    fields: traverseFields({
                        config,
                        fields: global.fields
                    })
                };
            })
        };
    };

//# sourceMappingURL=index.js.map