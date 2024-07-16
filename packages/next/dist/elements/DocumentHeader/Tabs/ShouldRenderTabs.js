'use client';
import { useDocumentInfo } from '@payloadcms/ui';
export const ShouldRenderTabs = ({ children })=>{
    const { id: idFromContext, collectionSlug, globalSlug } = useDocumentInfo();
    const id = idFromContext !== 'create' ? idFromContext : null;
    // Don't show tabs when creating new documents
    if (collectionSlug && id || globalSlug) {
        return children;
    }
    return null;
};

//# sourceMappingURL=ShouldRenderTabs.js.map