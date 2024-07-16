import { createContext, useContext } from 'react';
export const LivePreviewContext = createContext({
    appIsReady: false,
    breakpoint: undefined,
    breakpoints: undefined,
    fieldSchemaJSON: undefined,
    iframeHasLoaded: false,
    iframeRef: undefined,
    isPopupOpen: false,
    measuredDeviceSize: {
        height: 0,
        width: 0
    },
    openPopupWindow: ()=>{},
    popupRef: undefined,
    previewWindowType: 'iframe',
    setAppIsReady: ()=>{},
    setBreakpoint: ()=>{},
    setHeight: ()=>{},
    setIframeHasLoaded: ()=>{},
    setMeasuredDeviceSize: ()=>{},
    setPreviewWindowType: ()=>{},
    setSize: ()=>{},
    setToolbarPosition: ()=>{},
    setWidth: ()=>{},
    setZoom: ()=>{},
    size: {
        height: 0,
        width: 0
    },
    toolbarPosition: {
        x: 0,
        y: 0
    },
    url: undefined,
    zoom: 1
});
export const useLivePreviewContext = ()=>useContext(LivePreviewContext);

//# sourceMappingURL=context.js.map