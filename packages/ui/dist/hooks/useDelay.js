import * as React from 'react';
export const useDelay = (delay, triggerOnMount = false)=>{
    const [hasDelayed, setHasDelayed] = React.useState(false);
    const triggerTimeoutRef = React.useRef(undefined);
    const triggerDelay = React.useCallback(()=>{
        setHasDelayed(false);
        clearTimeout(triggerTimeoutRef.current);
        triggerTimeoutRef.current = setTimeout(()=>{
            setHasDelayed(true);
        }, delay);
        return ()=>{
            clearTimeout(triggerTimeoutRef.current);
        };
    }, [
        delay
    ]);
    React.useEffect(()=>{
        if (triggerOnMount) {
            triggerDelay();
        }
    }, [
        triggerDelay,
        triggerOnMount
    ]);
    return [
        hasDelayed,
        triggerDelay
    ];
};

//# sourceMappingURL=useDelay.js.map