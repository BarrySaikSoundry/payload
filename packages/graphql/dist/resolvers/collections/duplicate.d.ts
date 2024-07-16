import type { Collection, CollectionSlug, DataFromCollectionSlug, PayloadRequest } from 'payload';
export type Resolver<TData> = (_: unknown, args: {
    draft: boolean;
    fallbackLocale?: string;
    id: string;
    locale?: string;
}, context: {
    req: PayloadRequest;
}) => Promise<TData>;
export default function duplicateResolver<TSlug extends CollectionSlug>(collection: Collection): Resolver<DataFromCollectionSlug<TSlug>>;
//# sourceMappingURL=duplicate.d.ts.map