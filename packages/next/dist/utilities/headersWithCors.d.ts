import type { PayloadRequest } from 'payload';
type CorsArgs = {
    headers: Headers;
    req: Partial<PayloadRequest>;
};
export declare const headersWithCors: ({ headers, req }: CorsArgs) => Headers;
export {};
//# sourceMappingURL=headersWithCors.d.ts.map