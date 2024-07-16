import type { SerializedElementNode, SerializedLexicalNode, Spread } from 'lexical';
export type LinkFields = {
    [key: string]: unknown;
    doc: {
        relationTo: string;
        value: {
            [key: string]: unknown;
            id: string;
        } | string;
    } | null;
    linkType: 'custom' | 'internal';
    newTab: boolean;
    url: string;
};
export type SerializedLinkNode<T extends SerializedLexicalNode = SerializedLexicalNode> = Spread<{
    fields: LinkFields;
    id?: string;
    type: 'link';
}, SerializedElementNode<T>>;
export type SerializedAutoLinkNode<T extends SerializedLexicalNode = SerializedLexicalNode> = {
    type: 'autolink';
} & Omit<SerializedLinkNode<T>, 'id' | 'type'>;
//# sourceMappingURL=types.d.ts.map