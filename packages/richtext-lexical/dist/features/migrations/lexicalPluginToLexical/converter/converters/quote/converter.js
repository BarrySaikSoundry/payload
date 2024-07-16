import { convertLexicalPluginNodesToLexical } from '../../index.js';
export const _QuoteConverter = {
    converter ({ converters, lexicalPluginNode }) {
        return {
            ...lexicalPluginNode,
            type: 'quote',
            children: convertLexicalPluginNodesToLexical({
                converters,
                lexicalPluginNodes: lexicalPluginNode.children,
                parentNodeType: 'quote'
            }),
            version: 1
        };
    },
    nodeTypes: [
        'quote'
    ]
};

//# sourceMappingURL=converter.js.map