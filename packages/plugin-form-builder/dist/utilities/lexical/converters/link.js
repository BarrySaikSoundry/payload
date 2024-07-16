import { replaceDoubleCurlys } from '../../replaceDoubleCurlys.js';
import { convertLexicalNodesToHTML } from '../serializeLexical.js';
export const LinkHTMLConverter = {
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
        const rel = node.fields.newTab ? ' rel="noopener noreferrer"' : '';
        const target = node.fields.newTab ? ' target="_blank"' : '';
        let href = node.fields.linkType === 'custom' ? node.fields.url : node.fields.doc?.value?.id;
        if (submissionData) {
            href = replaceDoubleCurlys(href, submissionData);
        }
        return `<a href="${href}"${target}${rel}>${childrenText}</a>`;
    },
    nodeTypes: [
        'link'
    ]
};

//# sourceMappingURL=link.js.map