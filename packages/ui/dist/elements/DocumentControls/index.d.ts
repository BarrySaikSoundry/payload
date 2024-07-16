import type { CollectionPermission, GlobalPermission, SanitizedCollectionConfig } from 'payload';
import React from 'react';
import './index.scss';
export declare const DocumentControls: React.FC<{
    apiURL: string;
    data?: any;
    disableActions?: boolean;
    hasPublishPermission?: boolean;
    hasSavePermission?: boolean;
    id?: number | string;
    isAccountView?: boolean;
    isEditing?: boolean;
    permissions: CollectionPermission | GlobalPermission | null;
    slug: SanitizedCollectionConfig['slug'];
}>;
//# sourceMappingURL=index.d.ts.map