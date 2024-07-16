import { convertLexicalNodesToHTML } from '../serializeLexical.js';
export const QuoteHTMLConverter = {
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
        return `<blockquote>${childrenText}</blockquote>`;
    },
    nodeTypes: [
        'quote'
    ]
};

//# sourceMappingURL=quote.js.map