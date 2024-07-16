import type { GlobalPermission } from '../../auth/index.js';
import type { PayloadRequest } from '../../types/index.js';
import type { SanitizedGlobalConfig } from '../config/types.js';
type Arguments = {
    globalConfig: SanitizedGlobalConfig;
    req: PayloadRequest;
};
export declare const docAccessOperation: (args: Arguments) => Promise<GlobalPermission>;
export {};
//# sourceMappingURL=docAccess.d.ts.map