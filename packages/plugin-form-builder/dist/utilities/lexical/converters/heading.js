import { convertLexicalNodesToHTML } from '../serializeLexical.js';
export const HeadingHTMLConverter = {
    async converter ({ converters, node, parent, submissionData }) {
        const childrenText = await convertLexicalNodesToHTML({
            converters,
            lexicalNodes: node.children,
            parent: {
                ...node,
                parent
            },
            submissionData
        });
        return '<' + node?.tag + '>' + childrenText + '</' + node?.tag + '>';
    },
    nodeTypes: [
        'heading'
    ]
};

//# sourceMappingURL=heading.js.map