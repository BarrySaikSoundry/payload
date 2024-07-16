/* eslint-disable @typescript-eslint/no-explicit-any */ import { convertLexicalPluginNodesToLexical } from '../../index.js';
export const _ListConverter = {
    converter ({ converters, lexicalPluginNode }) {
        return {
            ...lexicalPluginNode,
            type: 'list',
            children: convertLexicalPluginNodesToLexical({
                converters,
                lexicalPluginNodes: lexicalPluginNode.children,
                parentNodeType: 'list'
            }),
            listType: lexicalPluginNode?.listType || 'number',
            tag: lexicalPluginNode?.tag || 'ol',
            version: 1
        };
    },
    nodeTypes: [
        'list'
    ]
};

//# sourceMappingURL=converter.js.map