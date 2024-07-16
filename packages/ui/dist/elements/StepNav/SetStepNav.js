'use client';
import { useEffect } from 'react';
import { useStepNav } from './context.js';
export const SetStepNav = ({ nav })=>{
    const { setStepNav } = useStepNav();
    useEffect(()=>{
        setStepNav(nav);
    }, [
        setStepNav,
        nav
    ]);
    return null;
};

//# sourceMappingURL=SetStepNav.js.map