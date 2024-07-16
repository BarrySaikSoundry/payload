import type { PayloadRequest } from '../types/index.js';
/**
 * complete a transaction calling adapter db.commitTransaction and delete the transactionID from req
 */
export declare function commitTransaction(req: PayloadRequest): Promise<void>;
//# sourceMappingURL=commitTransaction.d.ts.map