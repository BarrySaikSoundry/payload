import { jsx as _jsx } from "react/jsx-runtime";
import { DecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode.js';
import ObjectID from 'bson-objectid';
import React from 'react';
const BlockComponent = /*#__PURE__*/ React.lazy(()=>import('../component/index.js').then((module)=>({
            default: module.BlockComponent
        })));
export class BlockNode extends DecoratorBlockNode {
    __fields;
    constructor({ fields, format, key }){
        super(format, key);
        this.__fields = fields;
    }
    static clone(node) {
        return new BlockNode({
            fields: node.__fields,
            format: node.__format,
            key: node.__key
        });
    }
    static getType() {
        return 'block';
    }
    static importDOM() {
        return {};
    }
    static importJSON(serializedNode) {
        if (serializedNode.version === 1) {
            // Convert (version 1 had the fields wrapped in another, unnecessary data property)
            serializedNode = {
                ...serializedNode,
                fields: {
                    ...serializedNode.fields.data
                },
                version: 2
            };
        }
        const node = $createBlockNode(serializedNode.fields);
        node.setFormat(serializedNode.format);
        return node;
    }
    static isInline() {
        return false;
    }
    decorate(editor, config) {
        // @ts-expect-error
        return /*#__PURE__*/ _jsx(BlockComponent, {
            formData: this.getFields(),
            nodeKey: this.getKey()
        });
    }
    exportDOM() {
        const element = document.createElement('div');
        const text = document.createTextNode(this.getTextContent());
        element.append(text);
        return {
            element
        };
    }
    exportJSON() {
        return {
            ...super.exportJSON(),
            type: 'block',
            fields: this.getFields(),
            version: 2
        };
    }
    getFields() {
        return this.getLatest().__fields;
    }
    getTextContent() {
        return `Block Field`;
    }
    setFields(fields) {
        const fieldsCopy = JSON.parse(JSON.stringify(fields));
        const writable = this.getWritable();
        writable.__fields = fieldsCopy;
    }
}
export function $createBlockNode(fields) {
    return new BlockNode({
        fields: {
            ...fields,
            id: fields?.id || new ObjectID.default().toHexString()
        }
    });
}
export function $isBlockNode(node) {
    return node instanceof BlockNode;
}

//# sourceMappingURL=BlocksNode.js.map