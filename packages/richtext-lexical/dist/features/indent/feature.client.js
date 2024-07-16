'use client';
import { INDENT_CONTENT_COMMAND, OUTDENT_CONTENT_COMMAND } from 'lexical';
import { IndentDecreaseIcon } from '../../lexical/ui/icons/IndentDecrease/index.js';
import { IndentIncreaseIcon } from '../../lexical/ui/icons/IndentIncrease/index.js';
import { createClientFeature } from '../../utilities/createClientFeature.js';
import { toolbarIndentGroupWithItems } from './toolbarIndentGroup.js';
const toolbarGroups = [
    toolbarIndentGroupWithItems([
        {
            ChildComponent: IndentDecreaseIcon,
            isActive: ()=>false,
            isEnabled: ({ selection })=>{
                if (!selection || !selection?.getNodes()?.length) {
                    return false;
                }
                for (const node of selection.getNodes()){
                    // If at least one node is indented, this should be active
                    if ('__indent' in node && node.__indent > 0 || node.getParent() && '__indent' in node.getParent() && node.getParent().__indent > 0) {
                        return true;
                    }
                }
                return false;
            },
            key: 'indentDecrease',
            label: ({ i18n })=>{
                return i18n.t('lexical:indent:decreaseLabel');
            },
            onSelect: ({ editor })=>{
                editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
            },
            order: 1
        },
        {
            ChildComponent: IndentIncreaseIcon,
            isActive: ()=>false,
            key: 'indentIncrease',
            label: ({ i18n })=>{
                return i18n.t('lexical:indent:increaseLabel');
            },
            onSelect: ({ editor })=>{
                editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
            },
            order: 2
        }
    ])
];
export const IndentFeatureClient = createClientFeature({
    toolbarFixed: {
        groups: toolbarGroups
    },
    toolbarInline: {
        groups: toolbarGroups
    }
});

//# sourceMappingURL=feature.client.js.map