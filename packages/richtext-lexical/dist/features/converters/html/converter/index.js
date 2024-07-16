import { createLocalReq } from 'payload';
export async function convertLexicalToHTML({ converters, data, payload, req }) {
    if (data?.root?.children?.length) {
        if (req === undefined && payload) {
            req = await createLocalReq({}, payload);
        }
        return await convertLexicalNodesToHTML({
            converters,
            lexicalNodes: data?.root?.children,
            parent: data?.root,
            req
        });
    }
    return '';
}
export async function convertLexicalNodesToHTML({ converters, lexicalNodes, parent, req }) {
    const unknownConverter = converters.find((converter)=>converter.nodeTypes.includes('unknown'));
    const htmlArray = await Promise.all(lexicalNodes.map(async (node, i)=>{
        const converterForNode = converters.find((converter)=>converter.nodeTypes.includes(node.type));
        try {
            if (!converterForNode) {
                if (unknownConverter) {
                    return await unknownConverter.converter({
                        childIndex: i,
                        converters,
                        node,
                        parent,
                        req
                    });
                }
                return '<span>unknown node</span>';
            }
            return await converterForNode.converter({
                childIndex: i,
                converters,
                node,
                parent,
                req
            });
        } catch (error) {
            console.error('Error converting lexical node to HTML:', error, 'node:', node);
            return '';
        }
    }));
    return htmlArray.join('') || '';
}

//# sourceMappingURL=index.js.map