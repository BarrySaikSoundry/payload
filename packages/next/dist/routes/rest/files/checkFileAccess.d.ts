import type { Collection, PayloadRequest, TypeWithID } from 'payload';
export declare function checkFileAccess({ collection, filename, req, }: {
    collection: Collection;
    filename: string;
    req: PayloadRequest;
}): Promise<Response | TypeWithID>;
//# sourceMappingURL=checkFileAccess.d.ts.map