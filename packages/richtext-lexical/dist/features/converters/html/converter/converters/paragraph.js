import { convertLexicalNodesToHTML } from '../index.js';
export const ParagraphHTMLConverter = {
    async converter ({ converters, node, parent, req }) {
        const childrenText = await convertLexicalNodesToHTML({
            converters,
            lexicalNodes: node.children,
            parent: {
                ...node,
                parent
            },
            req
        });
        return `<p>${childrenText}</p>`;
    },
    nodeTypes: [
        'paragraph'
    ]
};

//# sourceMappingURL=paragraph.js.map