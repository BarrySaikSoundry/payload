import type { Klass, LexicalNode, LexicalNodeReplacement } from 'lexical';
import type { SanitizedClientEditorConfig, SanitizedServerEditorConfig } from '../config/types.js';
export declare function getEnabledNodes({ editorConfig, }: {
    editorConfig: SanitizedClientEditorConfig | SanitizedServerEditorConfig;
}): Array<Klass<LexicalNode> | LexicalNodeReplacement>;
//# sourceMappingURL=index.d.ts.map