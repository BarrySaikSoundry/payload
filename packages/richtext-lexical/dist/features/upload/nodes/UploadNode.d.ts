import type { SerializedDecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode.js';
import type { DOMConversionMap, DOMExportOutput, ElementFormatType, LexicalNode, NodeKey, Spread } from 'lexical';
import type { CollectionSlug } from 'payload';
import type { JSX } from 'react';
import { DecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode.js';
export type UploadData = {
    fields: {
        [key: string]: unknown;
    };
    id: string;
    relationTo: CollectionSlug;
    value: number | string;
};
export type SerializedUploadNode = {
    children?: never;
    type: 'upload';
} & Spread<UploadData, SerializedDecoratorBlockNode>;
export declare class UploadNode extends DecoratorBlockNode {
    __data: UploadData;
    constructor({ data, format, key, }: {
        data: UploadData;
        format?: ElementFormatType;
        key?: NodeKey;
    });
    static clone(node: UploadNode): UploadNode;
    static getType(): string;
    static importDOM(): DOMConversionMap | null;
    static importJSON(serializedNode: SerializedUploadNode): UploadNode;
    static isInline(): false;
    decorate(): JSX.Element;
    exportDOM(): DOMExportOutput;
    exportJSON(): SerializedUploadNode;
    getData(): UploadData;
    setData(data: UploadData): void;
    updateDOM(): false;
}
export declare function $createUploadNode({ data, }: {
    data: Omit<UploadData, 'id'> & Partial<Pick<UploadData, 'id'>>;
}): UploadNode;
export declare function $isUploadNode(node: LexicalNode | null | undefined): node is UploadNode;
//# sourceMappingURL=UploadNode.d.ts.map