export const ready = (args)=>{
    const { serverURL } = args;
    if (typeof window !== 'undefined') {
        // This subscription may have been from either an iframe or a popup
        // We need to report 'ready' to the parent window, whichever it may be
        // i.e. `window?.opener` for popups, `window?.parent` for iframes
        const windowToPostTo = window?.opener || window?.parent;
        windowToPostTo?.postMessage({
            type: 'payload-live-preview',
            ready: true
        }, serverURL);
    }
};

//# sourceMappingURL=ready.js.map