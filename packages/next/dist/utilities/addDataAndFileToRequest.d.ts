import type { PayloadRequest } from 'payload';
type AddDataAndFileToRequest = (req: PayloadRequest) => Promise<void>;
/**
 * Mutates the Request, appending 'data' and 'file' if found
 */
export declare const addDataAndFileToRequest: AddDataAndFileToRequest;
export {};
//# sourceMappingURL=addDataAndFileToRequest.d.ts.map