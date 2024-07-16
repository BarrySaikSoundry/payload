'use client';
import { ready, subscribe, unsubscribe } from '@payloadcms/live-preview';
import { useCallback, useEffect, useRef, useState } from 'react';
// To prevent the flicker of missing data on initial load,
// you can pass in the initial page data from the server
// To prevent the flicker of stale data while the post message is being sent,
// you can conditionally render loading UI based on the `isLoading` state
export const useLivePreview = (props)=>{
    const { apiRoute, depth, initialData, serverURL } = props;
    const [data, setData] = useState(initialData);
    const [isLoading, setIsLoading] = useState(true);
    const hasSentReadyMessage = useRef(false);
    const onChange = useCallback((mergedData)=>{
        setData(mergedData);
        setIsLoading(false);
    }, []);
    useEffect(()=>{
        const subscription = subscribe({
            apiRoute,
            callback: onChange,
            depth,
            initialData,
            serverURL
        });
        if (!hasSentReadyMessage.current) {
            hasSentReadyMessage.current = true;
            ready({
                serverURL
            });
        }
        return ()=>{
            unsubscribe(subscription);
        };
    }, [
        serverURL,
        onChange,
        depth,
        initialData,
        apiRoute
    ]);
    return {
        data,
        isLoading
    };
};

//# sourceMappingURL=useLivePreview.js.map