'use client';
import { $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical';
import { UnderlineIcon } from '../../../lexical/ui/icons/Underline/index.js';
import { createClientFeature } from '../../../utilities/createClientFeature.js';
import { toolbarFormatGroupWithItems } from '../shared/toolbarFormatGroup.js';
const toolbarGroups = [
    toolbarFormatGroupWithItems([
        {
            ChildComponent: UnderlineIcon,
            isActive: ({ selection })=>{
                if ($isRangeSelection(selection)) {
                    return selection.hasFormat('underline');
                }
                return false;
            },
            key: 'underline',
            onSelect: ({ editor })=>{
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
            },
            order: 3
        }
    ])
];
export const UnderlineFeatureClient = createClientFeature({
    toolbarFixed: {
        groups: toolbarGroups
    },
    toolbarInline: {
        groups: toolbarGroups
    }
});

//# sourceMappingURL=feature.client.js.map