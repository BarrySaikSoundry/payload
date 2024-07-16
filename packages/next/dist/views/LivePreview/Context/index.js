'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { DndContext } from '@dnd-kit/core';
import { fieldSchemaToJSON } from 'payload/shared';
import React, { useCallback, useEffect, useState } from 'react';
import { customCollisionDetection } from './collisionDetection.js';
import { LivePreviewContext } from './context.js';
import { sizeReducer } from './sizeReducer.js';
export const LivePreviewProvider = ({ breakpoints, children, fieldSchema, isPopupOpen, openPopupWindow, popupRef, url })=>{
    const [previewWindowType, setPreviewWindowType] = useState('iframe');
    const [appIsReady, setAppIsReady] = useState(false);
    const [listeningForMessages, setListeningForMessages] = useState(false);
    const iframeRef = React.useRef(null);
    const [iframeHasLoaded, setIframeHasLoaded] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [position, setPosition] = useState({
        x: 0,
        y: 0
    });
    const [size, setSize] = React.useReducer(sizeReducer, {
        height: 0,
        width: 0
    });
    const [measuredDeviceSize, setMeasuredDeviceSize] = useState({
        height: 0,
        width: 0
    });
    const [breakpoint, setBreakpoint] = React.useState('responsive');
    const [fieldSchemaJSON] = useState(()=>{
        return fieldSchemaToJSON(fieldSchema);
    });
    // The toolbar needs to freely drag and drop around the page
    const handleDragEnd = (ev)=>{
        // only update position if the toolbar is completely within the preview area
        // otherwise reset it back to the previous position
        // TODO: reset to the nearest edge of the preview area
        if (ev.over && ev.over.id === 'live-preview-area') {
            const newPos = {
                x: position.x + ev.delta.x,
                y: position.y + ev.delta.y
            };
            setPosition(newPos);
        } else {
        // reset
        }
    };
    const setWidth = useCallback((width)=>{
        setSize({
            type: 'width',
            value: width
        });
    }, [
        setSize
    ]);
    const setHeight = useCallback((height)=>{
        setSize({
            type: 'height',
            value: height
        });
    }, [
        setSize
    ]);
    // explicitly set new width and height when as new breakpoints are selected
    // exclude `custom` breakpoint as it is handled by the `setWidth` and `setHeight` directly
    useEffect(()=>{
        const foundBreakpoint = breakpoints?.find((bp)=>bp.name === breakpoint);
        if (foundBreakpoint && breakpoint !== 'responsive' && breakpoint !== 'custom' && typeof foundBreakpoint?.width === 'number' && typeof foundBreakpoint?.height === 'number') {
            setSize({
                type: 'reset',
                value: {
                    height: foundBreakpoint.height,
                    width: foundBreakpoint.width
                }
            });
        }
    }, [
        breakpoint,
        breakpoints
    ]);
    // Receive the `ready` message from the popup window
    // This indicates that the app is ready to receive `window.postMessage` events
    // This is also the only cross-origin way of detecting when a popup window has loaded
    // Unlike iframe elements which have an `onLoad` handler, there is no way to access `window.open` on popups
    useEffect(()=>{
        const handleMessage = (event)=>{
            if (url?.startsWith(event.origin) && event.data && typeof event.data === 'object' && event.data.type === 'payload-live-preview') {
                if (event.data.ready) {
                    setAppIsReady(true);
                }
            }
        };
        window.addEventListener('message', handleMessage);
        setListeningForMessages(true);
        return ()=>{
            window.removeEventListener('message', handleMessage);
        };
    }, [
        url,
        listeningForMessages
    ]);
    const handleWindowChange = useCallback((type)=>{
        setAppIsReady(false);
        setPreviewWindowType(type);
        if (type === 'popup') openPopupWindow();
    }, [
        openPopupWindow
    ]);
    // when the user closes the popup window, switch back to the iframe
    // the `usePopupWindow` reports the `isPopupOpen` state for us to use here
    useEffect(()=>{
        const newPreviewWindowType = isPopupOpen ? 'popup' : 'iframe';
        if (newPreviewWindowType !== previewWindowType) {
            handleWindowChange('iframe');
        }
    }, [
        previewWindowType,
        isPopupOpen,
        handleWindowChange
    ]);
    return /*#__PURE__*/ _jsx(LivePreviewContext.Provider, {
        value: {
            appIsReady,
            breakpoint,
            breakpoints,
            fieldSchemaJSON,
            iframeHasLoaded,
            iframeRef,
            isPopupOpen,
            measuredDeviceSize,
            openPopupWindow,
            popupRef,
            previewWindowType,
            setAppIsReady,
            setBreakpoint,
            setHeight,
            setIframeHasLoaded,
            setMeasuredDeviceSize,
            setPreviewWindowType: handleWindowChange,
            setSize,
            setToolbarPosition: setPosition,
            setWidth,
            setZoom,
            size,
            toolbarPosition: position,
            url,
            zoom
        },
        children: /*#__PURE__*/ _jsx(DndContext, {
            collisionDetection: customCollisionDetection,
            onDragEnd: handleDragEnd,
            children: listeningForMessages && children
        })
    });
};

//# sourceMappingURL=index.js.map