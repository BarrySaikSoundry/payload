import { useEffect, useState } from 'react';
export function useDebouncedEffect(effect, delay, deps) {
    const [debouncedEffect, setDebouncedEffect] = useState(()=>effect);
    useEffect(()=>{
        const handler = setTimeout(()=>{
            setDebouncedEffect(()=>effect);
        }, delay);
        return ()=>{
            clearTimeout(handler);
        };
    }, [
        ...deps,
        delay
    ]);
    useEffect(()=>{
        debouncedEffect();
    }, [
        debouncedEffect
    ]);
}

//# sourceMappingURL=useDebouncedEffect.js.map