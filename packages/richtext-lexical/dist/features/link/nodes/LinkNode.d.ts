import type { BaseSelection, DOMConversionMap, EditorConfig, ElementNode as ElementNodeType, LexicalCommand, LexicalNode, NodeKey, RangeSelection } from 'lexical';
import { ElementNode } from 'lexical';
import type { LinkPayload } from '../plugins/floatingLinkEditor/types.js';
import type { LinkFields, SerializedLinkNode } from './types.js';
/** @noInheritDoc */
export declare class LinkNode extends ElementNode {
    __fields: LinkFields;
    __id: string;
    constructor({ id, fields, key, }: {
        fields: LinkFields;
        id: string;
        key?: NodeKey;
    });
    static clone(node: LinkNode): LinkNode;
    static getType(): string;
    static importDOM(): DOMConversionMap | null;
    static importJSON(serializedNode: SerializedLinkNode): LinkNode;
    canBeEmpty(): false;
    canInsertTextAfter(): false;
    canInsertTextBefore(): false;
    createDOM(config: EditorConfig): HTMLAnchorElement;
    exportJSON(): SerializedLinkNode;
    extractWithChild(child: LexicalNode, selection: BaseSelection, destination: 'clone' | 'html'): boolean;
    getFields(): LinkFields;
    getID(): string;
    insertNewAfter(selection: RangeSelection, restoreSelection?: boolean): ElementNodeType | null;
    isInline(): true;
    sanitizeUrl(url: string): string;
    setFields(fields: LinkFields): void;
    updateDOM(prevNode: LinkNode, anchor: HTMLAnchorElement, config: EditorConfig): boolean;
}
export declare function $createLinkNode({ id, fields }: {
    fields: LinkFields;
    id?: string;
}): LinkNode;
export declare function $isLinkNode(node: LexicalNode | null | undefined): node is LinkNode;
export declare const TOGGLE_LINK_COMMAND: LexicalCommand<LinkPayload | null>;
export declare function $toggleLink(payload: LinkPayload): void;
//# sourceMappingURL=LinkNode.d.ts.map