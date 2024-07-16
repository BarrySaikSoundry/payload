import type { PayloadRequest } from '../types/index.js';
import type { Permissions } from './types.js';
type GetAccessResultsArgs = {
    req: PayloadRequest;
};
export declare function getAccessResults({ req }: GetAccessResultsArgs): Promise<Permissions>;
export {};
//# sourceMappingURL=getAccessResults.d.ts.map