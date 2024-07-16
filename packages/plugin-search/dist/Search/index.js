import { LinkToDoc } from './ui/index.js';
// all settings can be overridden by the config
export const generateSearchCollection = (pluginConfig)=>{
    const defaultFields = [
        {
            name: 'title',
            type: 'text',
            admin: {
                readOnly: true
            }
        },
        {
            name: 'priority',
            type: 'number',
            admin: {
                position: 'sidebar'
            }
        },
        {
            name: 'doc',
            type: 'relationship',
            admin: {
                position: 'sidebar',
                readOnly: true
            },
            index: true,
            maxDepth: 0,
            relationTo: pluginConfig?.collections || [],
            required: true
        },
        {
            name: 'docUrl',
            type: 'ui',
            admin: {
                components: {
                    Field: LinkToDoc
                },
                position: 'sidebar'
            }
        }
    ];
    const newConfig = {
        ...pluginConfig?.searchOverrides || {},
        slug: pluginConfig?.searchOverrides?.slug || 'search',
        access: {
            create: ()=>false,
            read: ()=>true,
            ...pluginConfig?.searchOverrides?.access || {}
        },
        admin: {
            defaultColumns: [
                'title'
            ],
            description: 'This is a collection of automatically created search results. These results are used by the global site search and will be updated automatically as documents in the CMS are created or updated.',
            enableRichTextRelationship: false,
            useAsTitle: 'title',
            ...pluginConfig?.searchOverrides?.admin || {}
        },
        fields: pluginConfig?.searchOverrides?.fields && typeof pluginConfig?.searchOverrides?.fields === 'function' ? pluginConfig?.searchOverrides.fields({
            defaultFields
        }) : defaultFields,
        hooks: {
            ...pluginConfig?.searchOverrides?.hooks || {}
        },
        labels: {
            plural: 'Search Results',
            singular: 'Search Result'
        }
    };
    return newConfig;
};

//# sourceMappingURL=index.js.map