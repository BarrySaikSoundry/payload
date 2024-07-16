import { defaultHTMLConverters } from './defaultConverters.js';
export async function serializeLexical(data, submissionData) {
    const converters = defaultHTMLConverters;
    if (data?.root?.children?.length) {
        return await convertLexicalNodesToHTML({
            converters,
            lexicalNodes: data?.root?.children,
            parent: data?.root,
            submissionData
        });
    }
    return '';
}
export async function convertLexicalNodesToHTML({ converters, lexicalNodes, parent, submissionData }) {
    const unknownConverter = converters.find((converter)=>converter.nodeTypes.includes('unknown'));
    const htmlArray = await Promise.all(lexicalNodes.map(async (node, i)=>{
        const converterForNode = converters.find((converter)=>converter.nodeTypes.includes(node.type));
        if (!converterForNode) {
            if (unknownConverter) {
                return unknownConverter.converter({
                    childIndex: i,
                    converters,
                    node,
                    parent,
                    submissionData
                });
            }
            return '<span>unknown node</span>';
        }
        return converterForNode.converter({
            childIndex: i,
            converters,
            node,
            parent,
            submissionData
        });
    }));
    return htmlArray.join('') || '';
}

//# sourceMappingURL=serializeLexical.js.map