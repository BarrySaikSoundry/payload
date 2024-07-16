export function convertLexicalPluginToLexical({ converters, lexicalPluginData }) {
    return {
        root: {
            type: 'root',
            children: convertLexicalPluginNodesToLexical({
                converters,
                lexicalPluginNodes: lexicalPluginData?.jsonContent?.root?.children || [],
                parentNodeType: 'root'
            }),
            direction: lexicalPluginData?.jsonContent?.root?.direction || 'ltr',
            format: lexicalPluginData?.jsonContent?.root?.format || '',
            indent: lexicalPluginData?.jsonContent?.root?.indent || 0,
            version: 1
        }
    };
}
export function convertLexicalPluginNodesToLexical({ converters, lexicalPluginNodes, parentNodeType }) {
    if (!lexicalPluginNodes?.length) {
        return [];
    }
    const unknownConverter = converters.find((converter)=>converter.nodeTypes.includes('unknown'));
    return lexicalPluginNodes.map((lexicalPluginNode, i)=>{
        if (lexicalPluginNode.type === 'paragraph') {
            return convertParagraphNode(converters, lexicalPluginNode);
        }
        if (lexicalPluginNode.type === 'text' || !lexicalPluginNode.type) {
            return convertTextNode(lexicalPluginNode);
        }
        const converter = converters.find((converter)=>converter.nodeTypes.includes(lexicalPluginNode.type));
        if (converter) {
            return converter.converter({
                childIndex: i,
                converters,
                lexicalPluginNode,
                parentNodeType
            });
        }
        console.warn('lexicalPluginToLexical > No converter found for node type: ' + lexicalPluginNode.type);
        return unknownConverter?.converter({
            childIndex: i,
            converters,
            lexicalPluginNode,
            parentNodeType
        });
    }) || [];
}
export function convertParagraphNode(converters, node) {
    return {
        ...node,
        type: 'paragraph',
        children: convertLexicalPluginNodesToLexical({
            converters,
            lexicalPluginNodes: node.children || [],
            parentNodeType: 'paragraph'
        }),
        version: 1
    };
}
export function convertTextNode(node) {
    return node;
}

//# sourceMappingURL=index.js.map