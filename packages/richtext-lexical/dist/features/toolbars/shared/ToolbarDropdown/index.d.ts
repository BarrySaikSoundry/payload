import React from 'react';
import type { LexicalEditor } from 'lexical';
import type { ToolbarGroupItem } from '../../types.js';
import './index.scss';
export declare const ToolbarDropdown: ({ Icon, anchorElem, classNames, editor, groupKey, items, itemsContainerClassNames, label, maxActiveItems, onActiveChange, }: {
    Icon?: React.FC;
    anchorElem: HTMLElement;
    classNames?: string[];
    editor: LexicalEditor;
    groupKey: string;
    items: ToolbarGroupItem[];
    itemsContainerClassNames?: string[];
    label?: string;
    /**
     * Maximum number of active items allowed. This is a performance optimization to prevent
     * unnecessary item active checks when the maximum number of active items is reached.
     */
    maxActiveItems?: number;
    onActiveChange?: ({ activeItems }: {
        activeItems: ToolbarGroupItem[];
    }) => void;
}) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=index.d.ts.map