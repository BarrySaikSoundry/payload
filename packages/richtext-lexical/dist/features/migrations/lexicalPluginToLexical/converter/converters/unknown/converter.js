import { convertLexicalPluginNodesToLexical } from '../../index.js';
export const _UnknownConverter = {
    converter ({ converters, lexicalPluginNode }) {
        return {
            type: 'unknownConverted',
            children: convertLexicalPluginNodesToLexical({
                converters,
                lexicalPluginNodes: lexicalPluginNode.children,
                parentNodeType: 'unknownConverted'
            }),
            data: {
                nodeData: lexicalPluginNode,
                nodeType: lexicalPluginNode.type
            },
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1
        };
    },
    nodeTypes: [
        'unknown'
    ]
};

//# sourceMappingURL=converter.js.map