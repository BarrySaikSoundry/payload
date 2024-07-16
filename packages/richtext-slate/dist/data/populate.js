import { createDataloaderCacheKey } from 'payload';
export const populate = async ({ id, collection, currentDepth, data, depth, draft, key, overrideAccess, req, showHiddenFields })=>{
    const dataRef = data;
    const doc = await req.payloadDataLoader.load(createDataloaderCacheKey({
        collectionSlug: collection.config.slug,
        currentDepth: currentDepth + 1,
        depth,
        docID: id,
        draft,
        fallbackLocale: req.locale,
        locale: req.fallbackLocale,
        overrideAccess: typeof overrideAccess === 'undefined' ? false : overrideAccess,
        showHiddenFields,
        transactionID: req.transactionID
    }));
    if (doc) {
        dataRef[key] = doc;
    } else {
        dataRef[key] = null;
    }
};

//# sourceMappingURL=populate.js.map