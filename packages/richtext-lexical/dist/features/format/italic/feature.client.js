'use client';
import { $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical';
import { ItalicIcon } from '../../../lexical/ui/icons/Italic/index.js';
import { createClientFeature } from '../../../utilities/createClientFeature.js';
import { toolbarFormatGroupWithItems } from '../shared/toolbarFormatGroup.js';
import { ITALIC_STAR, ITALIC_UNDERSCORE } from './markdownTransformers.js';
const toolbarGroups = [
    toolbarFormatGroupWithItems([
        {
            ChildComponent: ItalicIcon,
            isActive: ({ selection })=>{
                if ($isRangeSelection(selection)) {
                    return selection.hasFormat('italic');
                }
                return false;
            },
            key: 'italic',
            onSelect: ({ editor })=>{
                editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
            },
            order: 2
        }
    ])
];
export const ItalicFeatureClient = createClientFeature({
    markdownTransformers: [
        ITALIC_STAR,
        ITALIC_UNDERSCORE
    ],
    toolbarFixed: {
        groups: toolbarGroups
    },
    toolbarInline: {
        groups: toolbarGroups
    }
});

//# sourceMappingURL=feature.client.js.map