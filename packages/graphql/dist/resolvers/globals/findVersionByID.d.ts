import type { Document, PayloadRequest, SanitizedGlobalConfig } from 'payload';
export type Resolver = (_: unknown, args: {
    draft?: boolean;
    fallbackLocale?: string;
    id: number | string;
    locale?: string;
}, context: {
    req: PayloadRequest;
}) => Promise<Document>;
export default function findVersionByIDResolver(globalConfig: SanitizedGlobalConfig): Resolver;
//# sourceMappingURL=findVersionByID.d.ts.map