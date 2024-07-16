import type { PayloadRequest } from '../../types/index.js';
import type { TypeWithVersion } from '../../versions/types.js';
import type { Collection, TypeWithID } from '../config/types.js';
export type Arguments = {
    collection: Collection;
    currentDepth?: number;
    depth?: number;
    disableErrors?: boolean;
    id: number | string;
    overrideAccess?: boolean;
    req: PayloadRequest;
    showHiddenFields?: boolean;
};
export declare const findVersionByIDOperation: <TData extends TypeWithID = any>(args: Arguments) => Promise<TypeWithVersion<TData>>;
//# sourceMappingURL=findVersionByID.d.ts.map