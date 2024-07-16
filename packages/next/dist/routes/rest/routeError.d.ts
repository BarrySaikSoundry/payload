import type { Collection, PayloadRequest, SanitizedConfig } from 'payload';
import { APIError } from 'payload';
export type ErrorResponse = {
    data?: any;
    errors: unknown[];
    stack?: string;
};
export declare const routeError: ({ collection, config: configArg, err, req, }: {
    collection?: Collection;
    config: Promise<SanitizedConfig> | SanitizedConfig;
    err: APIError;
    req: Partial<PayloadRequest>;
}) => Promise<Response>;
//# sourceMappingURL=routeError.d.ts.map