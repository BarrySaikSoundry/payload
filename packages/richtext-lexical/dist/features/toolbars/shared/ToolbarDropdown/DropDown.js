'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
const baseClass = 'toolbar-popup__dropdown-item';
const DropDownContext = /*#__PURE__*/ React.createContext(null);
export function DropDownItem({ active, children, editor, enabled, item, title }) {
    const [className, setClassName] = useState(baseClass);
    useEffect(()=>{
        setClassName([
            baseClass,
            enabled === false ? 'disabled' : '',
            active ? 'active' : '',
            item?.key ? `${baseClass}-${item.key}` : ''
        ].filter(Boolean).join(' '));
    }, [
        enabled,
        active,
        className,
        item.key
    ]);
    const ref = useRef(null);
    const dropDownContext = React.useContext(DropDownContext);
    if (dropDownContext === null) {
        throw new Error('DropDownItem must be used within a DropDown');
    }
    const { registerItem } = dropDownContext;
    useEffect(()=>{
        if (ref?.current != null) {
            registerItem(ref);
        }
    }, [
        ref,
        registerItem
    ]);
    return /*#__PURE__*/ _jsx("button", {
        className: className,
        onClick: ()=>{
            if (enabled !== false) {
                editor._updateTags = new Set([
                    ...editor._updateTags,
                    'toolbar'
                ]) // without setting the tags, our onSelect will not be able to trigger our onChange as focus onChanges are ignored.
                ;
                editor.focus(()=>{
                    // We need to wrap the onSelect in the callback, so the editor is properly focused before the onSelect is called.
                    item.onSelect({
                        editor,
                        isActive: active
                    });
                });
            }
        },
        onMouseDown: (e)=>{
            // This is required for Firefox compatibility. Without it, the dropdown will disappear without the onClick being called.
            // This only happens in Firefox. Must be something about how Firefox handles focus events differently.
            e.preventDefault();
        },
        ref: ref,
        title: title,
        type: "button",
        children: children
    });
}
function DropDownItems({ children, dropDownRef, itemsContainerClassNames, onClose }) {
    const [items, setItems] = useState();
    const [highlightedItem, setHighlightedItem] = useState();
    const registerItem = useCallback((itemRef)=>{
        setItems((prev)=>prev != null ? [
                ...prev,
                itemRef
            ] : [
                itemRef
            ]);
    }, [
        setItems
    ]);
    const handleKeyDown = (event)=>{
        if (items == null) return;
        const { key } = event;
        if ([
            'ArrowDown',
            'ArrowUp',
            'Escape',
            'Tab'
        ].includes(key)) {
            event.preventDefault();
        }
        if (key === 'Escape' || key === 'Tab') {
            onClose();
        } else if (key === 'ArrowUp') {
            setHighlightedItem((prev)=>{
                if (prev == null) return items[0];
                const index = items.indexOf(prev) - 1;
                return items[index === -1 ? items.length - 1 : index];
            });
        } else if (key === 'ArrowDown') {
            setHighlightedItem((prev)=>{
                if (prev == null) return items[0];
                return items[items.indexOf(prev) + 1];
            });
        }
    };
    const contextValue = useMemo(()=>({
            registerItem
        }), [
        registerItem
    ]);
    useEffect(()=>{
        if (items != null && highlightedItem == null) {
            setHighlightedItem(items[0]);
        }
        if (highlightedItem != null && highlightedItem?.current != null) {
            highlightedItem.current.focus();
        }
    }, [
        items,
        highlightedItem
    ]);
    return /*#__PURE__*/ _jsx(DropDownContext.Provider, {
        value: contextValue,
        children: /*#__PURE__*/ _jsx("div", {
            className: (itemsContainerClassNames ?? [
                'toolbar-popup__dropdown-items'
            ]).join(' '),
            onKeyDown: handleKeyDown,
            ref: dropDownRef,
            children: children
        })
    });
}
export function DropDown({ Icon, buttonAriaLabel, buttonClassName, children, disabled = false, itemsContainerClassNames, label, stopCloseOnClickSelf }) {
    const dropDownRef = useRef(null);
    const buttonRef = useRef(null);
    const [showDropDown, setShowDropDown] = useState(false);
    const handleClose = ()=>{
        setShowDropDown(false);
        if (buttonRef?.current != null) {
            buttonRef.current.focus();
        }
    };
    useEffect(()=>{
        const button = buttonRef.current;
        const dropDown = dropDownRef.current;
        if (showDropDown && button !== null && dropDown !== null) {
            const { left, top } = button.getBoundingClientRect();
            const scrollTopOffset = window.scrollY || document.documentElement.scrollTop;
            dropDown.style.top = `${top + scrollTopOffset + button.offsetHeight + 5}px`;
            dropDown.style.left = `${Math.min(left - 5, window.innerWidth - dropDown.offsetWidth - 20)}px`;
        }
    }, [
        dropDownRef,
        buttonRef,
        showDropDown
    ]);
    useEffect(()=>{
        const button = buttonRef.current;
        if (button !== null && showDropDown) {
            const handle = (event)=>{
                const { target } = event;
                if (stopCloseOnClickSelf != null) {
                    if (dropDownRef.current != null && dropDownRef.current.contains(target)) {
                        return;
                    }
                }
                if (!button.contains(target)) {
                    setShowDropDown(false);
                }
            };
            document.addEventListener('click', handle);
            return ()=>{
                document.removeEventListener('click', handle);
            };
        }
    }, [
        dropDownRef,
        buttonRef,
        showDropDown,
        stopCloseOnClickSelf
    ]);
    const portal = /*#__PURE__*/ createPortal(/*#__PURE__*/ _jsx(DropDownItems, {
        dropDownRef: dropDownRef,
        itemsContainerClassNames: itemsContainerClassNames,
        onClose: handleClose,
        children: children
    }), document.body);
    return /*#__PURE__*/ _jsxs(React.Fragment, {
        children: [
            /*#__PURE__*/ _jsxs("button", {
                "aria-label": buttonAriaLabel,
                className: buttonClassName + (showDropDown ? ' active' : ''),
                disabled: disabled,
                onClick: (event)=>{
                    event.preventDefault();
                    setShowDropDown(!showDropDown);
                },
                onMouseDown: (e)=>{
                    // This fixes a bug where you are unable to click the button if you are in a NESTED editor (editor in blocks field in editor).
                    // Thus only happens if you click on the SVG of the button. Clicking on the outside works. Related issue: https://github.com/payloadcms/payload/issues/4025
                    // TODO: Find out why exactly it happens and why e.preventDefault() on the mouseDown fixes it. Write that down here, or potentially fix a root cause, if there is any.
                    e.preventDefault();
                },
                ref: buttonRef,
                type: "button",
                children: [
                    Icon && /*#__PURE__*/ _jsx(Icon, {}),
                    label && /*#__PURE__*/ _jsx("span", {
                        className: "toolbar-popup__dropdown-label",
                        children: label
                    }),
                    /*#__PURE__*/ _jsx("i", {
                        className: "toolbar-popup__dropdown-caret"
                    })
                ]
            }),
            showDropDown && /*#__PURE__*/ _jsx(React.Fragment, {
                children: portal
            })
        ]
    });
}

//# sourceMappingURL=DropDown.js.map