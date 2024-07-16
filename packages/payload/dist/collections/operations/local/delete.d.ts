import type { CollectionSlug, Payload, TypedLocale } from '../../../index.js';
import type { Document, PayloadRequest, RequestContext, Where } from '../../../types/index.js';
import type { BulkOperationResult, DataFromCollectionSlug } from '../../config/types.js';
export type BaseOptions<TSlug extends CollectionSlug> = {
    collection: TSlug;
    /**
     * context, which will then be passed to req.context, which can be read by hooks
     */
    context?: RequestContext;
    depth?: number;
    fallbackLocale?: TypedLocale;
    locale?: TypedLocale;
    overrideAccess?: boolean;
    req?: PayloadRequest;
    showHiddenFields?: boolean;
    user?: Document;
};
export type ByIDOptions<TSlug extends CollectionSlug> = {
    id: number | string;
    where?: never;
} & BaseOptions<TSlug>;
export type ManyOptions<TSlug extends CollectionSlug> = {
    id?: never;
    where: Where;
} & BaseOptions<TSlug>;
export type Options<TSlug extends CollectionSlug> = ByIDOptions<TSlug> | ManyOptions<TSlug>;
declare function deleteLocal<TSlug extends CollectionSlug>(payload: Payload, options: ByIDOptions<TSlug>): Promise<DataFromCollectionSlug<TSlug>>;
declare function deleteLocal<TSlug extends CollectionSlug>(payload: Payload, options: ManyOptions<TSlug>): Promise<BulkOperationResult<TSlug>>;
declare function deleteLocal<TSlug extends CollectionSlug>(payload: Payload, options: Options<TSlug>): Promise<BulkOperationResult<TSlug> | DataFromCollectionSlug<TSlug>>;
export default deleteLocal;
//# sourceMappingURL=delete.d.ts.map