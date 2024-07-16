import type { LexicalEditor } from 'lexical';
import React, { type ReactNode } from 'react';
import type { ToolbarGroupItem } from '../../types.js';
export declare function DropDownItem({ active, children, editor, enabled, item, title, }: {
    active?: boolean;
    children: React.ReactNode;
    editor: LexicalEditor;
    enabled?: boolean;
    item: ToolbarGroupItem;
    title?: string;
}): React.ReactNode;
export declare function DropDown({ Icon, buttonAriaLabel, buttonClassName, children, disabled, itemsContainerClassNames, label, stopCloseOnClickSelf, }: {
    Icon?: React.FC;
    buttonAriaLabel?: string;
    buttonClassName: string;
    children: ReactNode;
    disabled?: boolean;
    itemsContainerClassNames?: string[];
    label?: string;
    stopCloseOnClickSelf?: boolean;
}): React.ReactNode;
//# sourceMappingURL=DropDown.d.ts.map