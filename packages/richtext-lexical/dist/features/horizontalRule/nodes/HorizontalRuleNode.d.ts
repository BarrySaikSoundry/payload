import type { DOMConversionMap, DOMExportOutput, EditorConfig, LexicalCommand, LexicalNode, SerializedLexicalNode, Spread } from 'lexical';
import { DecoratorNode } from 'lexical';
import * as React from 'react';
/**
 * Serialized representation of a horizontal rule node. Serialized = converted to JSON. This is what is stored in the database / in the lexical editor state.
 */
export type SerializedHorizontalRuleNode = Spread<{
    children?: never;
    type: 'horizontalrule';
}, SerializedLexicalNode>;
export declare const INSERT_HORIZONTAL_RULE_COMMAND: LexicalCommand<void>;
/**
 * This node is a DecoratorNode. DecoratorNodes allow you to render React components in the editor.
 *
 * They need both createDom and decorate functions. createDom => outside of the html. decorate => React Component inside of the html.
 *
 * If we used DecoratorBlockNode instead, we would only need a decorate method
 */
export declare class HorizontalRuleNode extends DecoratorNode<React.ReactElement> {
    static clone(node: HorizontalRuleNode): HorizontalRuleNode;
    static getType(): string;
    /**
     * Defines what happens if you copy an hr element from another page and paste it into the lexical editor
     *
     * This also determines the behavior of lexical's internal HTML -> Lexical converter
     */
    static importDOM(): DOMConversionMap | null;
    /**
     * The data for this node is stored serialized as JSON. This is the "load function" of that node: it takes the saved data and converts it into a node.
     */
    static importJSON(serializedNode: SerializedHorizontalRuleNode): HorizontalRuleNode;
    /**
     * Determines how the hr element is rendered in the lexical editor. This is only the "initial" / "outer" HTML element.
     */
    createDOM(config: EditorConfig): HTMLElement;
    /**
     * Allows you to render a React component within whatever createDOM returns.
     */
    decorate(): React.ReactElement;
    /**
     * Opposite of importDOM, this function defines what happens when you copy an hr element from the lexical editor and paste it into another page.
     *
     * This also determines the behavior of lexical's internal Lexical -> HTML converter
     */
    exportDOM(): DOMExportOutput;
    /**
     * Opposite of importJSON. This determines what data is saved in the database / in the lexical editor state.
     */
    exportJSON(): SerializedLexicalNode;
    getTextContent(): string;
    isInline(): false;
    updateDOM(): boolean;
}
export declare function $createHorizontalRuleNode(): HorizontalRuleNode;
export declare function $isHorizontalRuleNode(node: LexicalNode | null | undefined): node is HorizontalRuleNode;
//# sourceMappingURL=HorizontalRuleNode.d.ts.map