'use client';
import { useEffect } from 'react';
import { useAuth } from '../../providers/Auth/index.js';
export const HydrateClientUser = ({ permissions, user })=>{
    const { setPermissions, setUser } = useAuth();
    useEffect(()=>{
        setUser(user);
        setPermissions(permissions);
    }, [
        user,
        permissions,
        setUser,
        setPermissions
    ]);
    return null;
};

//# sourceMappingURL=index.js.map