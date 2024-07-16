import type { Collection } from '../../collections/config/types.js';
import type { PayloadRequest } from '../../types/index.js';
export type Result = {
    token?: string;
    user: Record<string, unknown>;
};
export type Arguments = {
    collection: Collection;
    data: {
        password: string;
        token: string;
    };
    depth?: number;
    overrideAccess?: boolean;
    req: PayloadRequest;
};
export declare const resetPasswordOperation: (args: Arguments) => Promise<Result>;
export default resetPasswordOperation;
//# sourceMappingURL=resetPassword.d.ts.map