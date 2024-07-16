import { $applyNodeReplacement, $isElementNode } from 'lexical';
import { LinkNode } from './LinkNode.js';
// Custom node type to override `canInsertTextAfter` that will
// allow typing within the link
export class AutoLinkNode extends LinkNode {
    static clone(node) {
        return new AutoLinkNode({
            id: undefined,
            fields: node.__fields,
            key: node.__key
        });
    }
    static getType() {
        return 'autolink';
    }
    static importDOM() {
        // TODO: Should link node should handle the import over autolink?
        return null;
    }
    static importJSON(serializedNode) {
        if (serializedNode.version === 1 && typeof serializedNode.fields?.doc?.value === 'object' && serializedNode.fields?.doc?.value?.id) {
            serializedNode.fields.doc.value = serializedNode.fields.doc.value.id;
            serializedNode.version = 2;
        }
        const node = $createAutoLinkNode({
            fields: serializedNode.fields
        });
        node.setFormat(serializedNode.format);
        node.setIndent(serializedNode.indent);
        node.setDirection(serializedNode.direction);
        return node;
    }
    // @ts-expect-error
    exportJSON() {
        const serialized = super.exportJSON();
        return {
            type: 'autolink',
            children: serialized.children,
            direction: serialized.direction,
            fields: serialized.fields,
            format: serialized.format,
            indent: serialized.indent,
            version: 2
        };
    }
    insertNewAfter(selection, restoreSelection = true) {
        const element = this.getParentOrThrow().insertNewAfter(selection, restoreSelection);
        if ($isElementNode(element)) {
            const linkNode = $createAutoLinkNode({
                fields: this.__fields
            });
            element.append(linkNode);
            return linkNode;
        }
        return null;
    }
}
export function $createAutoLinkNode({ fields }) {
    return $applyNodeReplacement(new AutoLinkNode({
        id: undefined,
        fields
    }));
}
export function $isAutoLinkNode(node) {
    return node instanceof AutoLinkNode;
}

//# sourceMappingURL=AutoLinkNode.js.map