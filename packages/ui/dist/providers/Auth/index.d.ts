import type { ClientUser, Permissions } from 'payload';
import React from 'react';
export type AuthContext<T = ClientUser> = {
    fetchFullUser: () => Promise<void>;
    logOut: () => void;
    permissions?: Permissions;
    refreshCookie: (forceRefresh?: boolean) => void;
    refreshCookieAsync: () => Promise<ClientUser>;
    refreshPermissions: () => Promise<void>;
    setPermissions: (permissions: Permissions) => void;
    setUser: (user: T) => void;
    strategy?: string;
    token?: string;
    tokenExpiration?: number;
    user?: T | null;
};
export declare const AuthProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useAuth: <T = ClientUser>() => AuthContext<T>;
//# sourceMappingURL=index.d.ts.map