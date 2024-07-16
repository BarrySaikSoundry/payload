export const hasSavePermission = (args)=>{
    const { collectionSlug, docPermissions, globalSlug, isEditing } = args;
    if (collectionSlug) {
        return Boolean(isEditing && docPermissions?.update?.permission || !isEditing && docPermissions?.create?.permission);
    }
    if (globalSlug) {
        return Boolean(docPermissions?.update?.permission);
    }
    return false;
};

//# sourceMappingURL=hasSavePermission.js.map