'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useCallback, useEffect } from 'react';
const baseClass = 'toolbar-popup__dropdown';
import { mergeRegister } from '@lexical/utils';
import { useTranslation } from '@payloadcms/ui';
import { $getSelection } from 'lexical';
import { useEditorConfigContext } from '../../../../lexical/config/client/EditorConfigProvider.js';
import { DropDown, DropDownItem } from './DropDown.js';
const ToolbarItem = ({ active, anchorElem, editor, enabled, item })=>{
    const { i18n } = useTranslation();
    if (item.Component) {
        return item?.Component && /*#__PURE__*/ _jsx(item.Component, {
            active: active,
            anchorElem: anchorElem,
            editor: editor,
            enabled: enabled,
            item: item
        }, item.key);
    }
    let title = item.key;
    if (item.label) {
        title = typeof item.label === 'function' ? item.label({
            i18n
        }) : item.label;
    }
    // Crop title to max. 25 characters
    if (title.length > 25) {
        title = title.substring(0, 25) + '...';
    }
    return /*#__PURE__*/ _jsxs(DropDownItem, {
        active: active,
        editor: editor,
        enabled: enabled,
        item: item,
        children: [
            item?.ChildComponent && /*#__PURE__*/ _jsx(item.ChildComponent, {}),
            /*#__PURE__*/ _jsx("span", {
                className: "text",
                children: title
            })
        ]
    }, item.key);
};
export const ToolbarDropdown = ({ Icon, anchorElem, classNames, editor, groupKey, items, itemsContainerClassNames, label, maxActiveItems, onActiveChange })=>{
    const [activeItemKeys, setActiveItemKeys] = React.useState([]);
    const [enabledItemKeys, setEnabledItemKeys] = React.useState([]);
    const editorConfigContext = useEditorConfigContext();
    const updateStates = useCallback(()=>{
        editor.getEditorState().read(()=>{
            const selection = $getSelection();
            const _activeItemKeys = [];
            const _activeItems = [];
            const _enabledItemKeys = [];
            for (const item of items){
                if (item.isActive && (!maxActiveItems || _activeItemKeys.length < maxActiveItems)) {
                    const isActive = item.isActive({
                        editor,
                        editorConfigContext,
                        selection
                    });
                    if (isActive) {
                        _activeItemKeys.push(item.key);
                        _activeItems.push(item);
                    }
                }
                if (item.isEnabled) {
                    const isEnabled = item.isEnabled({
                        editor,
                        editorConfigContext,
                        selection
                    });
                    if (isEnabled) {
                        _enabledItemKeys.push(item.key);
                    }
                } else {
                    _enabledItemKeys.push(item.key);
                }
            }
            setActiveItemKeys(_activeItemKeys);
            setEnabledItemKeys(_enabledItemKeys);
            if (onActiveChange) {
                onActiveChange({
                    activeItems: _activeItems
                });
            }
        });
    }, [
        editor,
        editorConfigContext,
        items,
        maxActiveItems,
        onActiveChange
    ]);
    useEffect(()=>{
        updateStates();
    }, [
        updateStates
    ]);
    useEffect(()=>{
        document.addEventListener('mouseup', updateStates);
        return ()=>{
            document.removeEventListener('mouseup', updateStates);
        };
    }, [
        updateStates
    ]);
    useEffect(()=>{
        return mergeRegister(editor.registerUpdateListener(()=>{
            updateStates();
        }));
    }, [
        editor,
        updateStates
    ]);
    return /*#__PURE__*/ _jsx(DropDown, {
        Icon: Icon,
        buttonAriaLabel: `${groupKey} dropdown`,
        buttonClassName: [
            baseClass,
            `${baseClass}-${groupKey}`,
            ...classNames || []
        ].filter(Boolean).join(' '),
        itemsContainerClassNames: [
            `${baseClass}-items`,
            ...itemsContainerClassNames || []
        ],
        label: label,
        children: items.length && items.map((item)=>{
            return /*#__PURE__*/ _jsx(ToolbarItem, {
                active: activeItemKeys.includes(item.key),
                anchorElem: anchorElem,
                editor: editor,
                enabled: enabledItemKeys.includes(item.key),
                item: item
            }, item.key);
        })
    }, groupKey);
};

//# sourceMappingURL=index.js.map