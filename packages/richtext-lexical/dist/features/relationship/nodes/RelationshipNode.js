import { jsx as _jsx } from "react/jsx-runtime";
import { DecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode.js';
import * as React from 'react';
const RelationshipComponent = /*#__PURE__*/ React.lazy(()=>import('./components/RelationshipComponent.js').then((module)=>({
            default: module.RelationshipComponent
        })));
function $relationshipElementToNode(domNode) {
    const id = domNode.getAttribute('data-lexical-relationship-id');
    const relationTo = domNode.getAttribute('data-lexical-relationship-relationTo');
    if (id != null && relationTo != null) {
        const node = $createRelationshipNode({
            relationTo,
            value: id
        });
        return {
            node
        };
    }
    return null;
}
export class RelationshipNode extends DecoratorBlockNode {
    __data;
    constructor({ data, format, key }){
        super(format, key);
        this.__data = data;
    }
    static clone(node) {
        return new RelationshipNode({
            data: node.__data,
            format: node.__format,
            key: node.__key
        });
    }
    static getType() {
        return 'relationship';
    }
    static importDOM() {
        return {
            div: (domNode)=>{
                if (!domNode.hasAttribute('data-lexical-relationship-relationTo') || !domNode.hasAttribute('data-lexical-relationship-id')) {
                    return null;
                }
                return {
                    conversion: $relationshipElementToNode,
                    priority: 2
                };
            }
        };
    }
    static importJSON(serializedNode) {
        if (serializedNode.version === 1 && serializedNode?.value?.id) {
            serializedNode.value = serializedNode.value.id;
        }
        const importedData = {
            relationTo: serializedNode.relationTo,
            value: serializedNode.value
        };
        const node = $createRelationshipNode(importedData);
        node.setFormat(serializedNode.format);
        return node;
    }
    static isInline() {
        return false;
    }
    decorate(editor, config) {
        return /*#__PURE__*/ _jsx(RelationshipComponent, {
            className: config.theme.relationship ?? 'LexicalEditorTheme__relationship',
            data: this.__data,
            format: this.__format,
            nodeKey: this.getKey()
        });
    }
    exportDOM() {
        const element = document.createElement('div');
        element.setAttribute('data-lexical-relationship-id', String(this.__data?.value));
        element.setAttribute('data-lexical-relationship-relationTo', this.__data?.relationTo);
        const text = document.createTextNode(this.getTextContent());
        element.append(text);
        return {
            element
        };
    }
    exportJSON() {
        return {
            ...super.exportJSON(),
            ...this.getData(),
            type: 'relationship',
            version: 2
        };
    }
    getData() {
        return this.getLatest().__data;
    }
    getTextContent() {
        return `${this.__data?.relationTo} relation to ${this.__data?.value}`;
    }
    setData(data) {
        const writable = this.getWritable();
        writable.__data = data;
    }
}
export function $createRelationshipNode(data) {
    return new RelationshipNode({
        data
    });
}
export function $isRelationshipNode(node) {
    return node instanceof RelationshipNode;
}

//# sourceMappingURL=RelationshipNode.js.map