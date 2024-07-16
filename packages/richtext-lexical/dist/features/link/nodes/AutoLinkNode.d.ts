import type { ElementNode, LexicalNode, RangeSelection } from 'lexical';
import type { LinkFields, SerializedAutoLinkNode } from './types.js';
import { LinkNode } from './LinkNode.js';
export declare class AutoLinkNode extends LinkNode {
    static clone(node: AutoLinkNode): AutoLinkNode;
    static getType(): string;
    static importDOM(): null;
    static importJSON(serializedNode: SerializedAutoLinkNode): AutoLinkNode;
    exportJSON(): SerializedAutoLinkNode;
    insertNewAfter(selection: RangeSelection, restoreSelection?: boolean): ElementNode | null;
}
export declare function $createAutoLinkNode({ fields }: {
    fields: LinkFields;
}): AutoLinkNode;
export declare function $isAutoLinkNode(node: LexicalNode | null | undefined): node is AutoLinkNode;
//# sourceMappingURL=AutoLinkNode.d.ts.map