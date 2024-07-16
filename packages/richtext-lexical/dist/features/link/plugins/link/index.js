'use client';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js';
import { mergeRegister } from '@lexical/utils';
import { $getSelection, $isElementNode, $isRangeSelection, COMMAND_PRIORITY_LOW, PASTE_COMMAND } from 'lexical';
import { useEffect } from 'react';
import { validateUrl } from '../../../../lexical/utils/url.js';
import { $toggleLink, LinkNode, TOGGLE_LINK_COMMAND } from '../../nodes/LinkNode.js';
export const LinkPlugin = ()=>{
    const [editor] = useLexicalComposerContext();
    useEffect(()=>{
        if (!editor.hasNodes([
            LinkNode
        ])) {
            throw new Error('LinkPlugin: LinkNode not registered on editor');
        }
        return mergeRegister(editor.registerCommand(TOGGLE_LINK_COMMAND, (payload)=>{
            $toggleLink(payload);
            return true;
        }, COMMAND_PRIORITY_LOW), validateUrl !== undefined ? editor.registerCommand(PASTE_COMMAND, (event)=>{
            const selection = $getSelection();
            if (!$isRangeSelection(selection) || selection.isCollapsed() || !(event instanceof ClipboardEvent) || event.clipboardData == null) {
                return false;
            }
            const clipboardText = event.clipboardData.getData('text');
            if (!validateUrl(clipboardText)) {
                return false;
            }
            // If we select nodes that are elements then avoid applying the link.
            if (!selection.getNodes().some((node)=>$isElementNode(node))) {
                const linkFields = {
                    doc: null,
                    linkType: 'custom',
                    newTab: false,
                    url: clipboardText
                };
                editor.dispatchCommand(TOGGLE_LINK_COMMAND, {
                    fields: linkFields,
                    text: null
                });
                event.preventDefault();
                return true;
            }
            return false;
        }, COMMAND_PRIORITY_LOW) : ()=>{
        // Don't paste arbitrary text as a link when there's no validate function
        });
    }, [
        editor
    ]);
    return null;
};

//# sourceMappingURL=index.js.map