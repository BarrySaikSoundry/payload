import type { LexicalCommand, LexicalEditor, TextNode } from 'lexical';
import type { JSX, MutableRefObject, ReactPortal } from 'react';
import type { MenuTextMatch } from '../useMenuTriggerMatch.js';
import type { SlashMenuGroupInternal, SlashMenuItem, SlashMenuItemInternal } from './types.js';
export type MenuResolution = {
    getRect: () => DOMRect;
    match?: MenuTextMatch;
};
export type MenuRenderFn = (anchorElementRef: MutableRefObject<HTMLElement | null>, itemProps: {
    groups: Array<SlashMenuGroupInternal>;
    selectItemAndCleanUp: (selectedItem: SlashMenuItem) => void;
    selectedItemKey: null | string;
    setSelectedItemKey: (itemKey: string) => void;
}, matchingString: null | string) => JSX.Element | ReactPortal | null;
export declare function getScrollParent(element: HTMLElement, includeHidden: boolean): HTMLBodyElement | HTMLElement;
export declare function useDynamicPositioning(resolution: MenuResolution | null, targetElement: HTMLElement | null, onReposition: () => void, onVisibilityChange?: (isInView: boolean) => void): void;
export declare const SCROLL_TYPEAHEAD_OPTION_INTO_VIEW_COMMAND: LexicalCommand<{
    index: number;
    item: SlashMenuItemInternal;
}>;
export declare function LexicalMenu({ anchorElementRef, close, editor, groups, menuRenderFn, onSelectItem, resolution, shouldSplitNodeWithQuery, }: {
    anchorElementRef: MutableRefObject<HTMLElement>;
    close: () => void;
    editor: LexicalEditor;
    groups: Array<SlashMenuGroupInternal>;
    menuRenderFn: MenuRenderFn;
    onSelectItem: (item: SlashMenuItem, textNodeContainingQuery: TextNode | null, closeMenu: () => void, matchingString: string) => void;
    resolution: MenuResolution;
    shouldSplitNodeWithQuery?: boolean;
}): JSX.Element | null;
export declare function useMenuAnchorRef(anchorElem: HTMLElement, resolution: MenuResolution | null, setResolution: (r: MenuResolution | null) => void, className?: string): MutableRefObject<HTMLElement>;
//# sourceMappingURL=LexicalMenu.d.ts.map