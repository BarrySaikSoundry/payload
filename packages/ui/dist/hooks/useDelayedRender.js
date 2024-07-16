import * as React from 'react';
import { useDelay } from './useDelay.js';
export const useDelayedRender = ({ delayBeforeShow, inTimeout, minShowTime, outTimeout, show })=>{
    const totalMountTime = inTimeout + minShowTime + outTimeout;
    const [hasDelayed, triggerDelay] = useDelay(delayBeforeShow);
    const [isMounted, setIsMounted] = React.useState(false);
    const [isUnmounting, setIsUnmounting] = React.useState(false);
    const onMountTimestampRef = React.useRef(0);
    const unmountTimeoutRef = React.useRef(undefined);
    const unmount = React.useCallback(()=>{
        setIsUnmounting(true);
        unmountTimeoutRef.current = setTimeout(()=>{
            setIsMounted(false);
            setIsUnmounting(false);
        }, outTimeout);
    }, [
        setIsUnmounting,
        outTimeout
    ]);
    React.useEffect(()=>{
        const shouldMount = hasDelayed && !isMounted && show;
        const shouldUnmount = isMounted && !show;
        if (shouldMount) {
            onMountTimestampRef.current = Date.now();
            setIsMounted(true);
        } else if (shouldUnmount) {
            const totalTimeMounted = Date.now() - onMountTimestampRef.current;
            const remainingTime = totalMountTime - totalTimeMounted;
            clearTimeout(unmountTimeoutRef.current);
            unmountTimeoutRef.current = setTimeout(unmount, Math.max(0, remainingTime));
        }
    }, [
        isMounted,
        show,
        unmount,
        totalMountTime,
        hasDelayed
    ]);
    return {
        isMounted,
        isUnmounting,
        triggerDelayedRender: triggerDelay
    };
};

//# sourceMappingURL=useDelayedRender.js.map