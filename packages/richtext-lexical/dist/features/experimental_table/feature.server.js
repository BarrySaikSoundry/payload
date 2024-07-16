import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import { sanitizeFields } from 'payload';
// eslint-disable-next-line payload/no-imports-from-exports-dir
import { TableFeatureClient } from '../../exports/client/index.js';
import { createServerFeature } from '../../utilities/createServerFeature.js';
const fields = [
    {
        name: 'rows',
        type: 'number',
        defaultValue: 5,
        required: true
    },
    {
        name: 'columns',
        type: 'number',
        defaultValue: 5,
        required: true
    }
];
export const EXPERIMENTAL_TableFeature = createServerFeature({
    feature: async ({ config, isRoot })=>{
        const validRelationships = config.collections.map((c)=>c.slug) || [];
        const sanitizedFields = await sanitizeFields({
            config: config,
            fields,
            requireFieldLevelRichTextEditor: isRoot,
            validRelationships
        });
        return {
            ClientFeature: TableFeatureClient,
            generateSchemaMap: ()=>{
                const schemaMap = new Map();
                schemaMap.set('fields', sanitizedFields);
                return schemaMap;
            },
            nodes: [
                {
                    node: TableNode
                },
                {
                    node: TableCellNode
                },
                {
                    node: TableRowNode
                }
            ]
        };
    },
    key: 'experimental_table'
});

//# sourceMappingURL=feature.server.js.map