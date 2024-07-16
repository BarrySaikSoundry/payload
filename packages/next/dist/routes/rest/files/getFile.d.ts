import type { Collection, PayloadRequest } from 'payload';
type Args = {
    collection: Collection;
    filename: string;
    req: PayloadRequest;
};
export declare const getFile: ({ collection, filename, req }: Args) => Promise<Response>;
export {};
//# sourceMappingURL=getFile.d.ts.map