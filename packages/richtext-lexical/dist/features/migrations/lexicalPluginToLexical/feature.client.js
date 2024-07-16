'use client';
import { createClientFeature } from '../../../utilities/createClientFeature.js';
import { convertLexicalPluginToLexical } from './converter/index.js';
import { UnknownConvertedNode } from './nodes/unknownConvertedNode/index.js';
export const LexicalPluginToLexicalFeatureClient = createClientFeature(({ clientFunctions })=>{
    const converters = Object.values(clientFunctions);
    return {
        hooks: {
            load ({ incomingEditorState }) {
                if (!incomingEditorState || !('jsonContent' in incomingEditorState)) {
                    // incomingEditorState null or not from Lexical Plugin
                    return incomingEditorState;
                }
                // Lexical Plugin => convert to lexical
                return convertLexicalPluginToLexical({
                    converters,
                    lexicalPluginData: incomingEditorState
                });
            }
        },
        nodes: [
            UnknownConvertedNode
        ]
    };
});

//# sourceMappingURL=feature.client.js.map