'use client';
import { isDocumentEvent, ready } from '@payloadcms/live-preview';
import { useCallback, useEffect, useRef } from 'react';
export const RefreshRouteOnSave = (props)=>{
    const { apiRoute, depth, refresh, serverURL } = props;
    const hasSentReadyMessage = useRef(false);
    const onMessage = useCallback((event)=>{
        if (isDocumentEvent(event, serverURL)) {
            if (typeof refresh === 'function') {
                refresh();
            } else {
                // eslint-disable-next-line no-console
                console.error('You must provide a refresh function to `RefreshRouteOnSave`');
            }
        }
    }, [
        refresh,
        serverURL
    ]);
    useEffect(()=>{
        if (typeof window !== 'undefined') {
            window.addEventListener('message', onMessage);
        }
        if (!hasSentReadyMessage.current) {
            hasSentReadyMessage.current = true;
            ready({
                serverURL
            });
        }
        return ()=>{
            if (typeof window !== 'undefined') {
                window.removeEventListener('message', onMessage);
            }
        };
    }, [
        serverURL,
        onMessage,
        depth,
        apiRoute
    ]);
    return null;
};

//# sourceMappingURL=RefreshRouteOnSave.js.map