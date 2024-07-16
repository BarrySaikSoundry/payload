import { handleMessage } from './handleMessage.js';
export const subscribe = (args)=>{
    const { apiRoute, callback, depth, initialData, serverURL } = args;
    const onMessage = async (event)=>{
        const mergedData = await handleMessage({
            apiRoute,
            depth,
            event,
            initialData,
            serverURL
        });
        callback(mergedData);
    };
    if (typeof window !== 'undefined') {
        window.addEventListener('message', onMessage);
    }
    return onMessage;
};

//# sourceMappingURL=subscribe.js.map