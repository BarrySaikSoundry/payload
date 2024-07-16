import type { DeepPartial } from 'ts-essentials';
import type { GlobalSlug, Payload, RequestContext, TypedLocale } from '../../../index.js';
import type { Document, PayloadRequest } from '../../../types/index.js';
import type { DataFromGlobalSlug } from '../../config/types.js';
export type Options<TSlug extends GlobalSlug> = {
    context?: RequestContext;
    data: DeepPartial<Omit<DataFromGlobalSlug<TSlug>, 'id'>>;
    depth?: number;
    draft?: boolean;
    fallbackLocale?: TypedLocale;
    locale?: TypedLocale;
    overrideAccess?: boolean;
    req?: PayloadRequest;
    showHiddenFields?: boolean;
    slug: TSlug;
    user?: Document;
};
export default function updateLocal<TSlug extends GlobalSlug>(payload: Payload, options: Options<TSlug>): Promise<DataFromGlobalSlug<TSlug>>;
//# sourceMappingURL=update.d.ts.map