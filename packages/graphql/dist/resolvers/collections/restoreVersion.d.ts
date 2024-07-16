import type { Collection, PayloadRequest } from 'payload';
export type Resolver = (_: unknown, args: {
    id: number | string;
}, context: {
    req: PayloadRequest;
}) => Promise<Document>;
export default function restoreVersionResolver(collection: Collection): Resolver;
//# sourceMappingURL=restoreVersion.d.ts.map