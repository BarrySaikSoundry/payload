export const sanitizeCollectionID = ({ id, collectionSlug, payload })=>{
    let sanitizedID = id;
    const collection = payload.collections[collectionSlug];
    // If default db ID type is a number, we should sanitize
    let shouldSanitize = Boolean(payload.db.defaultIDType === 'number');
    // UNLESS the customIDType for this collection is text.... then we leave it
    if (shouldSanitize && collection.customIDType === 'text') shouldSanitize = false;
    // If we still should sanitize, parse float
    if (shouldSanitize) sanitizedID = parseFloat(sanitizedID);
    return sanitizedID;
};

//# sourceMappingURL=sanitizeCollectionID.js.map