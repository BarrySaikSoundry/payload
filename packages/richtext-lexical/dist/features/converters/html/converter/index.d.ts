import type { SerializedEditorState, SerializedLexicalNode } from 'lexical';
import type { Payload, PayloadRequest } from 'payload';
import type { HTMLConverter, SerializedLexicalNodeWithParent } from './types.js';
export type ConvertLexicalToHTMLArgs = {
    converters: HTMLConverter[];
    data: SerializedEditorState;
} & ({
    /**
     * This payload property will only be used if req is undefined.
     */
    payload?: Payload;
    /**
     * When the converter is called, req CAN be passed in depending on where it's run.
     * If this is undefined and config is passed through, lexical will create a new req object for you. If this is null or
     * config is undefined, lexical will not create a new req object for you and local API / server-side-only
     * functionality will be disabled.
     */
    req?: null | undefined;
} | {
    /**
     * This payload property will only be used if req is undefined.
     */
    payload?: never;
    /**
     * When the converter is called, req CAN be passed in depending on where it's run.
     * If this is undefined and config is passed through, lexical will create a new req object for you. If this is null or
     * config is undefined, lexical will not create a new req object for you and local API / server-side-only
     * functionality will be disabled.
     */
    req: PayloadRequest;
});
export declare function convertLexicalToHTML({ converters, data, payload, req, }: ConvertLexicalToHTMLArgs): Promise<string>;
export declare function convertLexicalNodesToHTML({ converters, lexicalNodes, parent, req, }: {
    converters: HTMLConverter[];
    lexicalNodes: SerializedLexicalNode[];
    parent: SerializedLexicalNodeWithParent;
    /**
     * When the converter is called, req CAN be passed in depending on where it's run.
     */
    req: PayloadRequest | null;
}): Promise<string>;
//# sourceMappingURL=index.d.ts.map