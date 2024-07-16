import type { SerializedDecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode.js';
import type { DOMConversionMap, DOMExportOutput, EditorConfig, ElementFormatType, LexicalEditor, LexicalNode, NodeKey, Spread } from 'lexical';
import { DecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode.js';
import { type JSX } from 'react';
export type BlockFields<TBlockFields extends object = Record<string, unknown>> = {
    /** Block form data */
    blockName: string;
    blockType: string;
    id: string;
} & TBlockFields;
export type SerializedBlockNode<TBlockFields extends object = Record<string, unknown>> = Spread<{
    children?: never;
    fields: BlockFields<TBlockFields>;
    type: 'block';
}, SerializedDecoratorBlockNode>;
export declare class BlockNode extends DecoratorBlockNode {
    __fields: BlockFields;
    constructor({ fields, format, key, }: {
        fields: BlockFields;
        format?: ElementFormatType;
        key?: NodeKey;
    });
    static clone(node: BlockNode): BlockNode;
    static getType(): string;
    static importDOM(): DOMConversionMap<HTMLDivElement> | null;
    static importJSON(serializedNode: SerializedBlockNode): BlockNode;
    static isInline(): false;
    decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element;
    exportDOM(): DOMExportOutput;
    exportJSON(): SerializedBlockNode;
    getFields(): BlockFields;
    getTextContent(): string;
    setFields(fields: BlockFields): void;
}
export declare function $createBlockNode(fields: Exclude<BlockFields, 'id'>): BlockNode;
export declare function $isBlockNode(node: BlockNode | LexicalNode | null | undefined): node is BlockNode;
//# sourceMappingURL=BlocksNode.d.ts.map