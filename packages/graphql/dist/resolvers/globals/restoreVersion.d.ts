import type { Document, PayloadRequest, SanitizedGlobalConfig } from 'payload';
type Resolver = (_: unknown, args: {
    id: number | string;
}, context: {
    req: PayloadRequest;
}) => Promise<Document>;
export default function restoreVersionResolver(globalConfig: SanitizedGlobalConfig): Resolver;
export {};
//# sourceMappingURL=restoreVersion.d.ts.map