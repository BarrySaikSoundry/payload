import type { SerializedEditorState, SerializedLexicalNode } from 'lexical';
import type { RichTextField, ValidateOptions } from 'payload';
import type { NodeValidation } from '../features/typesServer.js';
export declare function validateNodes({ nodeValidations, nodes, validation: validationFromProps, }: {
    nodeValidations: Map<string, Array<NodeValidation>>;
    nodes: SerializedLexicalNode[];
    validation: {
        options: ValidateOptions<unknown, unknown, RichTextField>;
        value: SerializedEditorState;
    };
}): Promise<string | true>;
//# sourceMappingURL=validateNodes.d.ts.map