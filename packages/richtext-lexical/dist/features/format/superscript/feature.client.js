'use client';
import { $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical';
import { SuperscriptIcon } from '../../../lexical/ui/icons/Superscript/index.js';
import { createClientFeature } from '../../../utilities/createClientFeature.js';
import { toolbarFormatGroupWithItems } from '../shared/toolbarFormatGroup.js';
const toolbarGroups = [
    toolbarFormatGroupWithItems([
        {
            ChildComponent: SuperscriptIcon,
            isActive: ({ selection })=>{
                if ($isRangeSelection(selection)) {
                    return selection.hasFormat('superscript');
                }
                return false;
            },
            key: 'superscript',
            onSelect: ({ editor })=>{
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript');
            },
            order: 6
        }
    ])
];
export const SuperscriptFeatureClient = createClientFeature({
    toolbarFixed: {
        groups: toolbarGroups
    },
    toolbarInline: {
        groups: toolbarGroups
    }
});

//# sourceMappingURL=feature.client.js.map