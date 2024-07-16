import { jsx as _jsx } from "react/jsx-runtime";
import { addClassNamesToElement } from '@lexical/utils';
import { $applyNodeReplacement, DecoratorNode, createCommand } from 'lexical';
import * as React from 'react';
const HorizontalRuleComponent = /*#__PURE__*/ React.lazy(()=>import('../component/index.js').then((module)=>({
            default: module.HorizontalRuleComponent
        })));
export const INSERT_HORIZONTAL_RULE_COMMAND = createCommand('INSERT_HORIZONTAL_RULE_COMMAND');
/**
 * This node is a DecoratorNode. DecoratorNodes allow you to render React components in the editor.
 *
 * They need both createDom and decorate functions. createDom => outside of the html. decorate => React Component inside of the html.
 *
 * If we used DecoratorBlockNode instead, we would only need a decorate method
 */ export class HorizontalRuleNode extends DecoratorNode {
    static clone(node) {
        return new HorizontalRuleNode(node.__key);
    }
    static getType() {
        return 'horizontalrule';
    }
    /**
   * Defines what happens if you copy an hr element from another page and paste it into the lexical editor
   *
   * This also determines the behavior of lexical's internal HTML -> Lexical converter
   */ static importDOM() {
        return {
            hr: ()=>({
                    conversion: $convertHorizontalRuleElement,
                    priority: 0
                })
        };
    }
    /**
   * The data for this node is stored serialized as JSON. This is the "load function" of that node: it takes the saved data and converts it into a node.
   */ static importJSON(serializedNode) {
        return $createHorizontalRuleNode();
    }
    /**
   * Determines how the hr element is rendered in the lexical editor. This is only the "initial" / "outer" HTML element.
   */ createDOM(config) {
        const element = document.createElement('hr');
        addClassNamesToElement(element, config.theme.hr);
        return element;
    }
    /**
   * Allows you to render a React component within whatever createDOM returns.
   */ decorate() {
        return /*#__PURE__*/ _jsx(HorizontalRuleComponent, {
            nodeKey: this.__key
        });
    }
    /**
   * Opposite of importDOM, this function defines what happens when you copy an hr element from the lexical editor and paste it into another page.
   *
   * This also determines the behavior of lexical's internal Lexical -> HTML converter
   */ exportDOM() {
        return {
            element: document.createElement('hr')
        };
    }
    /**
   * Opposite of importJSON. This determines what data is saved in the database / in the lexical editor state.
   */ exportJSON() {
        return {
            type: 'horizontalrule',
            version: 1
        };
    }
    getTextContent() {
        return '\n';
    }
    isInline() {
        return false;
    }
    updateDOM() {
        return false;
    }
}
function $convertHorizontalRuleElement() {
    return {
        node: $createHorizontalRuleNode()
    };
}
export function $createHorizontalRuleNode() {
    return $applyNodeReplacement(new HorizontalRuleNode());
}
export function $isHorizontalRuleNode(node) {
    return node instanceof HorizontalRuleNode;
}

//# sourceMappingURL=HorizontalRuleNode.js.map