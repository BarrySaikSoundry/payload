import type { TypeWithID, UpdateGlobalVersionArgs } from 'payload';
import type { MongooseAdapter } from './index.js';
export declare function updateGlobalVersion<T extends TypeWithID>(this: MongooseAdapter, { id, global, locale, req, versionData, where, }: UpdateGlobalVersionArgs<T>): Promise<any>;
//# sourceMappingURL=updateGlobalVersion.d.ts.map