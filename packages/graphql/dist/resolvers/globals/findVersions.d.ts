import type { Document, PayloadRequest, SanitizedGlobalConfig, Where } from 'payload';
export type Resolver = (_: unknown, args: {
    fallbackLocale?: string;
    limit?: number;
    locale?: string;
    page?: number;
    sort?: string;
    where: Where;
}, context: {
    req: PayloadRequest;
}) => Promise<Document>;
export default function findVersionsResolver(globalConfig: SanitizedGlobalConfig): Resolver;
//# sourceMappingURL=findVersions.d.ts.map