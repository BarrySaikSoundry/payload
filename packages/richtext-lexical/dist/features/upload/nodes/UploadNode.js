import { jsx as _jsx } from "react/jsx-runtime";
import { DecoratorBlockNode } from '@lexical/react/LexicalDecoratorBlockNode.js';
import ObjectID from 'bson-objectid';
import { $applyNodeReplacement } from 'lexical';
import * as React from 'react';
const RawUploadComponent = /*#__PURE__*/ React.lazy(()=>import('../component/index.js').then((module)=>({
            default: module.UploadComponent
        })));
function isGoogleDocCheckboxImg(img) {
    return img.parentElement != null && img.parentElement.tagName === 'LI' && img.previousSibling === null && img.getAttribute('aria-roledescription') === 'checkbox';
}
function $convertUploadElement(domNode) {
    if (domNode.hasAttribute('data-lexical-upload-relation-to') && domNode.hasAttribute('data-lexical-upload-id')) {
        const id = domNode.getAttribute('data-lexical-upload-id');
        const relationTo = domNode.getAttribute('data-lexical-upload-relation-to');
        if (id != null && relationTo != null) {
            const node = $createUploadNode({
                data: {
                    fields: {},
                    relationTo,
                    value: id
                }
            });
            return {
                node
            };
        }
    }
    const img = domNode;
    if (img.src.startsWith('file:///') || isGoogleDocCheckboxImg(img)) {
        return null;
    }
    // TODO: Auto-upload functionality here!
    //}
    return null;
}
export class UploadNode extends DecoratorBlockNode {
    __data;
    constructor({ data, format, key }){
        super(format, key);
        this.__data = data;
    }
    static clone(node) {
        return new UploadNode({
            data: node.__data,
            format: node.__format,
            key: node.__key
        });
    }
    static getType() {
        return 'upload';
    }
    static importDOM() {
        return {
            img: (node)=>({
                    conversion: $convertUploadElement,
                    priority: 0
                })
        };
    }
    static importJSON(serializedNode) {
        if (serializedNode.version === 1 && serializedNode?.value?.id) {
            serializedNode.value = serializedNode.value.id;
        }
        if (serializedNode.version === 2 && !serializedNode?.id) {
            serializedNode.id = new ObjectID.default().toHexString();
            serializedNode.version = 3;
        }
        const importedData = {
            id: serializedNode.id,
            fields: serializedNode.fields,
            relationTo: serializedNode.relationTo,
            value: serializedNode.value
        };
        const node = $createUploadNode({
            data: importedData
        });
        node.setFormat(serializedNode.format);
        return node;
    }
    static isInline() {
        return false;
    }
    decorate() {
        // @ts-expect-error
        return /*#__PURE__*/ _jsx(RawUploadComponent, {
            data: this.__data,
            format: this.__format,
            nodeKey: this.getKey()
        });
    }
    exportDOM() {
        const element = document.createElement('img');
        element.setAttribute('data-lexical-upload-id', String(this.__data?.value));
        element.setAttribute('data-lexical-upload-relation-to', this.__data?.relationTo);
        return {
            element
        };
    }
    exportJSON() {
        return {
            ...super.exportJSON(),
            ...this.getData(),
            type: 'upload',
            version: 3
        };
    }
    getData() {
        return this.getLatest().__data;
    }
    setData(data) {
        const writable = this.getWritable();
        writable.__data = data;
    }
    updateDOM() {
        return false;
    }
}
export function $createUploadNode({ data }) {
    if (!data?.id) {
        data.id = new ObjectID.default().toHexString();
    }
    return $applyNodeReplacement(new UploadNode({
        data: data
    }));
}
export function $isUploadNode(node) {
    return node instanceof UploadNode;
}

//# sourceMappingURL=UploadNode.js.map