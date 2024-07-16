'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ShimmerEffect, useAllFormFields, useDocumentEvents } from '@payloadcms/ui';
import { reduceFieldsToValues } from 'payload/shared';
import React, { useEffect } from 'react';
import { useLivePreviewContext } from '../Context/context.js';
import { DeviceContainer } from '../Device/index.js';
import { IFrame } from '../IFrame/index.js';
import { LivePreviewToolbar } from '../Toolbar/index.js';
const baseClass = 'live-preview-window';
export const LivePreview = (props)=>{
    const { appIsReady, iframeHasLoaded, iframeRef, popupRef, previewWindowType, setIframeHasLoaded, url } = useLivePreviewContext();
    const { mostRecentUpdate } = useDocumentEvents();
    const { breakpoint, fieldSchemaJSON } = useLivePreviewContext();
    const prevWindowType = React.useRef(undefined);
    const [fields] = useAllFormFields();
    // For client-side apps, send data through `window.postMessage`
    // The preview could either be an iframe embedded on the page
    // Or it could be a separate popup window
    // We need to transmit data to both accordingly
    useEffect(()=>{
        // For performance, do no reduce fields to values until after the iframe or popup has loaded
        if (fields && window && 'postMessage' in window && appIsReady) {
            const values = reduceFieldsToValues(fields, true);
            // To reduce on large `postMessage` payloads, only send `fieldSchemaToJSON` one time
            // To do this, the underlying JS function maintains a cache of this value
            // So we need to send it through each time the window type changes
            // But only once per window type change, not on every render, because this is a potentially large obj
            const shouldSendSchema = !prevWindowType.current || prevWindowType.current !== previewWindowType;
            prevWindowType.current = previewWindowType;
            const message = {
                type: 'payload-live-preview',
                data: values,
                externallyUpdatedRelationship: mostRecentUpdate,
                fieldSchemaJSON: shouldSendSchema ? fieldSchemaJSON : undefined
            };
            // Post message to external popup window
            if (previewWindowType === 'popup' && popupRef.current) {
                popupRef.current.postMessage(message, url);
            }
            // Post message to embedded iframe
            if (previewWindowType === 'iframe' && iframeRef.current) {
                iframeRef.current.contentWindow?.postMessage(message, url);
            }
        }
    }, [
        fields,
        url,
        iframeHasLoaded,
        previewWindowType,
        popupRef,
        appIsReady,
        iframeRef,
        setIframeHasLoaded,
        fieldSchemaJSON,
        mostRecentUpdate
    ]);
    // To support SSR, we transmit a `window.postMessage` event without a payload
    // This is because the event will ultimately trigger a server-side roundtrip
    // i.e., save, save draft, autosave, etc. will fire `router.refresh()`
    useEffect(()=>{
        const message = {
            type: 'payload-document-event'
        };
        // Post message to external popup window
        if (previewWindowType === 'popup' && popupRef.current) {
            popupRef.current.postMessage(message, url);
        }
        // Post message to embedded iframe
        if (previewWindowType === 'iframe' && iframeRef.current) {
            iframeRef.current.contentWindow?.postMessage(message, url);
        }
    }, [
        mostRecentUpdate,
        iframeRef,
        popupRef,
        previewWindowType,
        url
    ]);
    if (previewWindowType === 'iframe') {
        return /*#__PURE__*/ _jsx("div", {
            className: [
                baseClass,
                breakpoint && breakpoint !== 'responsive' && `${baseClass}--has-breakpoint`
            ].filter(Boolean).join(' '),
            children: /*#__PURE__*/ _jsxs("div", {
                className: `${baseClass}__wrapper`,
                children: [
                    /*#__PURE__*/ _jsx(LivePreviewToolbar, {
                        ...props
                    }),
                    /*#__PURE__*/ _jsx("div", {
                        className: `${baseClass}__main`,
                        children: /*#__PURE__*/ _jsx(DeviceContainer, {
                            children: url ? /*#__PURE__*/ _jsx(IFrame, {
                                ref: iframeRef,
                                setIframeHasLoaded: setIframeHasLoaded,
                                url: url
                            }) : /*#__PURE__*/ _jsx(ShimmerEffect, {
                                height: "100%"
                            })
                        })
                    })
                ]
            })
        });
    }
};

//# sourceMappingURL=index.js.map