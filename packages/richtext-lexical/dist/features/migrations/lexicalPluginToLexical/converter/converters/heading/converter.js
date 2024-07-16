import { convertLexicalPluginNodesToLexical } from '../../index.js';
export const _HeadingConverter = {
    converter ({ converters, lexicalPluginNode }) {
        return {
            ...lexicalPluginNode,
            type: 'heading',
            children: convertLexicalPluginNodesToLexical({
                converters,
                lexicalPluginNodes: lexicalPluginNode.children,
                parentNodeType: 'heading'
            }),
            version: 1
        };
    },
    nodeTypes: [
        'heading'
    ]
};

//# sourceMappingURL=converter.js.map