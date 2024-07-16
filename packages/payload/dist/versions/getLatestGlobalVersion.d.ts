import type { SanitizedGlobalConfig } from '../globals/config/types.js';
import type { Document, Payload, PayloadRequest, Where } from '../types/index.js';
type Args = {
    config: SanitizedGlobalConfig;
    locale?: string;
    payload: Payload;
    req?: PayloadRequest;
    slug: string;
    where: Where;
};
export declare const getLatestGlobalVersion: ({ slug, config, locale, payload, req, where, }: Args) => Promise<{
    global: Document;
    globalExists: boolean;
}>;
export {};
//# sourceMappingURL=getLatestGlobalVersion.d.ts.map