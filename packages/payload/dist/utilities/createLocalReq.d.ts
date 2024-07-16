import type { User } from '../auth/types.js';
import type { Payload, RequestContext } from '../index.js';
import type { PayloadRequest } from '../types/index.js';
type CreateLocalReq = (options: {
    context?: RequestContext;
    fallbackLocale?: string;
    locale?: string;
    req?: PayloadRequest;
    user?: User;
}, payload: Payload) => Promise<PayloadRequest>;
export declare const createLocalReq: CreateLocalReq;
export {};
//# sourceMappingURL=createLocalReq.d.ts.map