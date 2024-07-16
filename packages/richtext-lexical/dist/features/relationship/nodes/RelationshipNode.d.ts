import type { SerializedDecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode.js';
import type { DOMConversionMap, DOMExportOutput, EditorConfig, ElementFormatType, LexicalEditor, LexicalNode, NodeKey, Spread } from 'lexical';
import type { CollectionSlug } from 'payload';
import type { JSX } from 'react';
import { DecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode.js';
export type RelationshipData = {
    relationTo: CollectionSlug;
    value: number | string;
};
export type SerializedRelationshipNode = {
    children?: never;
    type: 'relationship';
} & Spread<RelationshipData, SerializedDecoratorBlockNode>;
export declare class RelationshipNode extends DecoratorBlockNode {
    __data: RelationshipData;
    constructor({ data, format, key, }: {
        data: RelationshipData;
        format?: ElementFormatType;
        key?: NodeKey;
    });
    static clone(node: RelationshipNode): RelationshipNode;
    static getType(): string;
    static importDOM(): DOMConversionMap<HTMLDivElement> | null;
    static importJSON(serializedNode: SerializedRelationshipNode): RelationshipNode;
    static isInline(): false;
    decorate(editor: LexicalEditor, config: EditorConfig): JSX.Element;
    exportDOM(): DOMExportOutput;
    exportJSON(): SerializedRelationshipNode;
    getData(): RelationshipData;
    getTextContent(): string;
    setData(data: RelationshipData): void;
}
export declare function $createRelationshipNode(data: RelationshipData): RelationshipNode;
export declare function $isRelationshipNode(node: LexicalNode | RelationshipNode | null | undefined): node is RelationshipNode;
//# sourceMappingURL=RelationshipNode.d.ts.map