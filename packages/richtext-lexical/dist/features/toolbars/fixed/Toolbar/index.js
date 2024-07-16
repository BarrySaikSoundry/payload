'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext.js';
import { useScrollInfo, useThrottledEffect, useTranslation } from '@payloadcms/ui';
import * as React from 'react';
import { useMemo } from 'react';
import { useEditorConfigContext } from '../../../../lexical/config/client/EditorConfigProvider.js';
import { ToolbarButton } from '../../shared/ToolbarButton/index.js';
import { ToolbarDropdown } from '../../shared/ToolbarDropdown/index.js';
function ButtonGroupItem({ anchorElem, editor, item }) {
    if (item.Component) {
        return item?.Component && /*#__PURE__*/ _jsx(item.Component, {
            anchorElem: anchorElem,
            editor: editor,
            item: item
        }, item.key);
    }
    return /*#__PURE__*/ _jsx(ToolbarButton, {
        editor: editor,
        item: item,
        children: item?.ChildComponent && /*#__PURE__*/ _jsx(item.ChildComponent, {})
    }, item.key);
}
function ToolbarGroupComponent({ anchorElem, editor, editorConfig, group, index }) {
    const { i18n } = useTranslation();
    const [dropdownLabel, setDropdownLabel] = React.useState(null);
    const [DropdownIcon, setDropdownIcon] = React.useState(null);
    React.useEffect(()=>{
        if (group?.type === 'dropdown' && group.items.length && group.ChildComponent) {
            setDropdownIcon(()=>group.ChildComponent);
        } else {
            setDropdownIcon(null);
        }
    }, [
        group
    ]);
    const onActiveChange = ({ activeItems })=>{
        if (!activeItems.length) {
            if (group?.type === 'dropdown' && group.items.length && group.ChildComponent) {
                setDropdownIcon(()=>group.ChildComponent);
                setDropdownLabel(null);
            } else {
                setDropdownIcon(null);
                setDropdownLabel(null);
            }
            return;
        }
        const item = activeItems[0];
        let label = item.key;
        if (item.label) {
            label = typeof item.label === 'function' ? item.label({
                i18n
            }) : item.label;
        }
        // Crop title to max. 25 characters
        if (label.length > 25) {
            label = label.substring(0, 25) + '...';
        }
        setDropdownLabel(label);
        setDropdownIcon(()=>item.ChildComponent);
    };
    return /*#__PURE__*/ _jsxs("div", {
        className: `fixed-toolbar__group fixed-toolbar__group-${group.key}`,
        children: [
            group.type === 'dropdown' && group.items.length && (DropdownIcon ? /*#__PURE__*/ _jsx(ToolbarDropdown, {
                Icon: DropdownIcon,
                anchorElem: anchorElem,
                editor: editor,
                groupKey: group.key,
                items: group.items,
                itemsContainerClassNames: [
                    'fixed-toolbar__dropdown-items'
                ],
                label: dropdownLabel,
                maxActiveItems: 1,
                onActiveChange: onActiveChange
            }) : /*#__PURE__*/ _jsx(ToolbarDropdown, {
                anchorElem: anchorElem,
                editor: editor,
                groupKey: group.key,
                items: group.items,
                itemsContainerClassNames: [
                    'fixed-toolbar__dropdown-items'
                ],
                label: dropdownLabel,
                maxActiveItems: 1,
                onActiveChange: onActiveChange
            })),
            group.type === 'buttons' && group.items.length && group.items.map((item)=>{
                return /*#__PURE__*/ _jsx(ButtonGroupItem, {
                    anchorElem: anchorElem,
                    editor: editor,
                    item: item
                }, item.key);
            }),
            index < editorConfig.features.toolbarFixed?.groups.length - 1 && /*#__PURE__*/ _jsx("div", {
                className: "divider"
            })
        ]
    }, group.key);
}
function FixedToolbar({ anchorElem, clientProps, editor, editorConfig, parentWithFixedToolbar }) {
    const currentToolbarRef = React.useRef(null);
    const { y } = useScrollInfo();
    // Memoize the parent toolbar element
    const parentToolbarElem = useMemo(()=>{
        if (!parentWithFixedToolbar || clientProps?.disableIfParentHasFixedToolbar) {
            return null;
        }
        const parentEditorElem = parentWithFixedToolbar.editorContainerRef.current;
        let sibling = parentEditorElem.previousElementSibling;
        while(sibling){
            if (sibling.classList.contains('fixed-toolbar')) {
                return sibling;
            }
            sibling = sibling.previousElementSibling;
        }
        return null;
    }, [
        clientProps?.disableIfParentHasFixedToolbar,
        parentWithFixedToolbar
    ]);
    useThrottledEffect(()=>{
        if (!parentToolbarElem) {
            // this also checks for clientProps?.disableIfParentHasFixedToolbar indirectly, see the parentToolbarElem useMemo
            return;
        }
        const currentToolbarElem = currentToolbarRef.current;
        if (!currentToolbarElem) {
            return;
        }
        const currentRect = currentToolbarElem.getBoundingClientRect();
        const parentRect = parentToolbarElem.getBoundingClientRect();
        // we only need to check for vertical overlap
        const overlapping = !(currentRect.bottom < parentRect.top || currentRect.top > parentRect.bottom);
        if (overlapping) {
            currentToolbarRef.current.className = 'fixed-toolbar fixed-toolbar--overlapping';
            parentToolbarElem.className = 'fixed-toolbar fixed-toolbar--hide';
        } else {
            if (!currentToolbarRef.current.classList.contains('fixed-toolbar--overlapping')) {
                return;
            }
            currentToolbarRef.current.className = 'fixed-toolbar';
            parentToolbarElem.className = 'fixed-toolbar';
        }
    }, 50, [
        currentToolbarRef,
        parentToolbarElem,
        y
    ]);
    return /*#__PURE__*/ _jsx("div", {
        className: "fixed-toolbar",
        onFocus: (event)=>{
            // Prevent other focus events being triggered. Otherwise, if this was to be clicked while in a child editor,
            // the parent editor will be focused, and the child editor will lose focus.
            event.stopPropagation();
        },
        ref: currentToolbarRef,
        children: editor.isEditable() && /*#__PURE__*/ _jsx(React.Fragment, {
            children: editorConfig?.features && editorConfig.features?.toolbarFixed?.groups.map((group, i)=>{
                return /*#__PURE__*/ _jsx(ToolbarGroupComponent, {
                    anchorElem: anchorElem,
                    editor: editor,
                    editorConfig: editorConfig,
                    group: group,
                    index: i
                }, group.key);
            })
        })
    });
}
const getParentEditorWithFixedToolbar = (editorConfigContext)=>{
    if (editorConfigContext.parentEditor?.editorConfig) {
        if (editorConfigContext.parentEditor?.editorConfig.resolvedFeatureMap.has('toolbarFixed')) {
            return editorConfigContext.parentEditor;
        } else {
            if (editorConfigContext.parentEditor) {
                return getParentEditorWithFixedToolbar(editorConfigContext.parentEditor);
            }
        }
    }
    return false;
};
export const FixedToolbarPlugin = ({ anchorElem, clientProps })=>{
    const [currentEditor] = useLexicalComposerContext();
    const editorConfigContext = useEditorConfigContext();
    const { editorConfig: currentEditorConfig } = editorConfigContext;
    const editor = clientProps.applyToFocusedEditor ? editorConfigContext.focusedEditor?.editor || currentEditor : currentEditor;
    const editorConfig = clientProps.applyToFocusedEditor ? editorConfigContext.focusedEditor?.editorConfig || currentEditorConfig : currentEditorConfig;
    const parentWithFixedToolbar = getParentEditorWithFixedToolbar(editorConfigContext);
    if (clientProps?.disableIfParentHasFixedToolbar) {
        if (parentWithFixedToolbar) {
            return null;
        }
    }
    if (!editorConfig?.features?.toolbarFixed?.groups?.length) {
        return null;
    }
    return /*#__PURE__*/ _jsx(FixedToolbar, {
        anchorElem: anchorElem,
        editor: editor,
        editorConfig: editorConfig,
        parentWithFixedToolbar: parentWithFixedToolbar
    });
};

//# sourceMappingURL=index.js.map