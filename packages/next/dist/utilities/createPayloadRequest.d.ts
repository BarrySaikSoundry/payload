import type { PayloadRequest, SanitizedConfig } from 'payload';
type Args = {
    config: Promise<SanitizedConfig> | SanitizedConfig;
    params?: {
        collection: string;
    };
    request: Request;
};
export declare const createPayloadRequest: ({ config: configPromise, params, request, }: Args) => Promise<PayloadRequest>;
export {};
//# sourceMappingURL=createPayloadRequest.d.ts.map