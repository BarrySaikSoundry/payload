import type { PayloadRequest } from '../../types/index.js';
import type { SanitizedGlobalConfig } from '../config/types.js';
type Args = {
    depth?: number;
    draft?: boolean;
    globalConfig: SanitizedGlobalConfig;
    overrideAccess?: boolean;
    req: PayloadRequest;
    showHiddenFields?: boolean;
    slug: string;
};
export declare const findOneOperation: <T extends Record<string, unknown>>(args: Args) => Promise<T>;
export {};
//# sourceMappingURL=findOne.d.ts.map