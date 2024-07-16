import type { CollectionSlug, Payload, RequestContext } from '../../../index.js';
import type { PayloadRequest } from '../../../types/index.js';
import type { Result } from '../forgotPassword.js';
export type Options<T extends CollectionSlug> = {
    collection: T;
    context?: RequestContext;
    data: {
        email: string;
    };
    disableEmail?: boolean;
    expiration?: number;
    req?: PayloadRequest;
};
declare function localForgotPassword<T extends CollectionSlug>(payload: Payload, options: Options<T>): Promise<Result>;
export default localForgotPassword;
//# sourceMappingURL=forgotPassword.d.ts.map