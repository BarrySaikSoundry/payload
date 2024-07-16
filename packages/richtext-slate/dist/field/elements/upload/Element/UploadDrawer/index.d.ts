import type { FormFieldBase } from '@payloadcms/ui';
import type { ClientCollectionConfig } from 'payload';
import React from 'react';
import type { UploadElementType } from '../../types.js';
export declare const UploadDrawer: React.FC<{
    drawerSlug: string;
    element: UploadElementType;
    fieldProps: {
        name: string;
        richTextComponentMap: Map<string, React.ReactNode>;
    } & FormFieldBase;
    relatedCollection: ClientCollectionConfig;
    schemaPath: string;
}>;
//# sourceMappingURL=index.d.ts.map