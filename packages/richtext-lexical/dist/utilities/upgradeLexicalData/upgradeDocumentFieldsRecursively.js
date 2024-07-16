import { createHeadlessEditor } from '@lexical/headless';
import { fieldAffectsData, fieldHasSubFields, fieldIsArrayType, tabHasName } from 'payload/shared';
import { getEnabledNodes } from '../../lexical/nodes/index.js';
export const upgradeDocumentFieldsRecursively = ({ data, fields, found })=>{
    for (const field of fields){
        if (fieldHasSubFields(field) && !fieldIsArrayType(field)) {
            if (fieldAffectsData(field) && typeof data[field.name] === 'object') {
                found += upgradeDocumentFieldsRecursively({
                    data: data[field.name],
                    fields: field.fields,
                    found
                });
            } else {
                found += upgradeDocumentFieldsRecursively({
                    data,
                    fields: field.fields,
                    found
                });
            }
        } else if (field.type === 'tabs') {
            field.tabs.forEach((tab)=>{
                found += upgradeDocumentFieldsRecursively({
                    data: tabHasName(tab) ? data[tab.name] : data,
                    fields: tab.fields,
                    found
                });
            });
        } else if (Array.isArray(data[field.name])) {
            if (field.type === 'blocks') {
                data[field.name].forEach((row, i)=>{
                    const block = field.blocks.find(({ slug })=>slug === row?.blockType);
                    if (block) {
                        found += upgradeDocumentFieldsRecursively({
                            data: data[field.name][i],
                            fields: block.fields,
                            found
                        });
                    }
                });
            }
            if (field.type === 'array') {
                data[field.name].forEach((_, i)=>{
                    found += upgradeDocumentFieldsRecursively({
                        data: data[field.name][i],
                        fields: field.fields,
                        found
                    });
                });
            }
        }
        if (field.type === 'richText' && data[field.name] && !Array.isArray(data[field.name]) && 'root' in data[field.name]) {
            // Lexical richText
            const editor = field.editor;
            if (editor && typeof editor === 'object') {
                if ('features' in editor && editor.features?.length) {
                    // Load lexical editor into lexical, then save it immediately
                    const editorState = data[field.name];
                    const headlessEditor = createHeadlessEditor({
                        nodes: getEnabledNodes({
                            editorConfig: editor.editorConfig
                        })
                    });
                    headlessEditor.setEditorState(headlessEditor.parseEditorState(editorState));
                    // get editor state
                    data[field.name] = headlessEditor.getEditorState().toJSON();
                    found++;
                }
            }
        }
    }
    return found;
};

//# sourceMappingURL=upgradeDocumentFieldsRecursively.js.map