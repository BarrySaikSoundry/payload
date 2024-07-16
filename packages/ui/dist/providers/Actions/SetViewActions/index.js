'use client';
import { useEffect } from 'react';
import { useActions } from '../index.js';
export const SetViewActions = ({ actions })=>{
    const { setViewActions } = useActions();
    useEffect(()=>{
        setViewActions(actions);
        return ()=>{
            setViewActions([]);
        };
    }, [
        setViewActions,
        actions
    ]);
    return null;
};

//# sourceMappingURL=index.js.map