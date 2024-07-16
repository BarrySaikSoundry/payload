// Credit: @Taiki92777
//    - Source: https://github.com/vercel/next.js/discussions/32231#discussioncomment-7284386
// Credit: `react-use` maintainers
//    -  Source: https://github.com/streamich/react-use/blob/ade8d3905f544305515d010737b4ae604cc51024/src/useBeforeUnload.ts#L2
import { useRouter } from 'next/navigation.js';
import { useCallback, useEffect, useRef } from 'react';
function on(obj, ...args) {
    if (obj && obj.addEventListener) {
        obj.addEventListener(...args);
    }
}
function off(obj, ...args) {
    if (obj && obj.removeEventListener) {
        obj.removeEventListener(...args);
    }
}
export const useBeforeUnload = (enabled = true, message)=>{
    const handler = useCallback((event)=>{
        const finalEnabled = typeof enabled === 'function' ? enabled() : true;
        if (!finalEnabled) {
            return;
        }
        event.preventDefault();
        if (message) {
            event.returnValue = message;
        }
        return message;
    }, [
        enabled,
        message
    ]);
    useEffect(()=>{
        if (!enabled) {
            return;
        }
        on(window, 'beforeunload', handler);
        return ()=>off(window, 'beforeunload', handler);
    }, [
        enabled,
        handler
    ]);
};
export const usePreventLeave = ({ hasAccepted = false, message = 'Are you sure want to leave this page?', onPrevent, prevent = true })=>{
    // check when page is about to be reloaded
    useBeforeUnload(prevent, message);
    const router = useRouter();
    const cancelledURL = useRef('');
    // check when page is about to be changed
    useEffect(()=>{
        function isAnchorOfCurrentUrl(currentUrl, newUrl) {
            const currentUrlObj = new URL(currentUrl);
            const newUrlObj = new URL(newUrl);
            // Compare hostname, pathname, and search parameters
            if (currentUrlObj.hostname === newUrlObj.hostname && currentUrlObj.pathname === newUrlObj.pathname && currentUrlObj.search === newUrlObj.search) {
                // Check if the new URL is just an anchor of the current URL page
                const currentHash = currentUrlObj.hash;
                const newHash = newUrlObj.hash;
                return currentHash !== newHash && currentUrlObj.href.replace(currentHash, '') === newUrlObj.href.replace(newHash, '');
            }
            return false;
        }
        function findClosestAnchor(element) {
            while(element && element.tagName.toLowerCase() !== 'a'){
                element = element.parentElement;
            }
            return element;
        }
        function handleClick(event) {
            try {
                const target = event.target;
                const anchor = findClosestAnchor(target);
                if (anchor) {
                    const currentUrl = window.location.href;
                    const newUrl = anchor.href;
                    const isAnchor = isAnchorOfCurrentUrl(currentUrl, newUrl);
                    const isDownloadLink = anchor.download !== '';
                    const isPageLeaving = !(newUrl === currentUrl || isAnchor || isDownloadLink);
                    if (isPageLeaving && prevent && (!onPrevent ? !window.confirm(message) : true)) {
                        // Keep a reference of the href
                        cancelledURL.current = newUrl;
                        // Cancel the route change
                        event.preventDefault();
                        event.stopPropagation();
                        if (typeof onPrevent === 'function') {
                            onPrevent();
                        }
                    }
                }
            } catch (err) {
                alert(err);
            }
        }
        // Add the global click event listener
        document.addEventListener('click', handleClick, true);
        // Clean up the global click event listener when the component is unmounted
        return ()=>{
            document.removeEventListener('click', handleClick, true);
        };
    }, [
        onPrevent,
        prevent,
        message
    ]);
    useEffect(()=>{
        if (hasAccepted && cancelledURL.current) {
            router.push(cancelledURL.current);
        }
    }, [
        hasAccepted,
        router
    ]);
};

//# sourceMappingURL=usePreventLeave.js.map