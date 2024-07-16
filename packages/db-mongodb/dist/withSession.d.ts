import type { ClientSession } from 'mongoose';
import type { PayloadRequest } from 'payload';
import type { MongooseAdapter } from './index.js';
/**
 * returns the session belonging to the transaction of the req.session if exists
 * @returns ClientSession
 */
export declare function withSession(db: MongooseAdapter, req: PayloadRequest): Promise<{
    session: ClientSession;
} | object>;
//# sourceMappingURL=withSession.d.ts.map