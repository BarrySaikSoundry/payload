import { convertLexicalPluginNodesToLexical } from '../../index.js';
export const _ListItemConverter = {
    converter ({ childIndex, converters, lexicalPluginNode }) {
        return {
            ...lexicalPluginNode,
            type: 'listitem',
            checked: undefined,
            children: convertLexicalPluginNodesToLexical({
                converters,
                lexicalPluginNodes: lexicalPluginNode.children,
                parentNodeType: 'listitem'
            }),
            value: childIndex + 1,
            version: 1
        };
    },
    nodeTypes: [
        'listitem'
    ]
};

//# sourceMappingURL=converter.js.map