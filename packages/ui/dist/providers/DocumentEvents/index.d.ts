import React from 'react';
export type UpdatedDocument = {
    entitySlug: string;
    id?: number | string;
    updatedAt: string;
};
export declare const DocumentEventsProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useDocumentEvents: () => {
    mostRecentUpdate: any;
    reportUpdate: (doc: UpdatedDocument) => any;
};
//# sourceMappingURL=index.d.ts.map