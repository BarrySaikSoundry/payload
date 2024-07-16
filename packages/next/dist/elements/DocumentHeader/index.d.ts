import type { I18n } from '@payloadcms/translations';
import type { Permissions, SanitizedCollectionConfig, SanitizedConfig, SanitizedGlobalConfig } from 'payload';
import React from 'react';
import './index.scss';
export declare const DocumentHeader: React.FC<{
    collectionConfig?: SanitizedCollectionConfig;
    config: SanitizedConfig;
    customHeader?: React.ReactNode;
    globalConfig?: SanitizedGlobalConfig;
    hideTabs?: boolean;
    i18n: I18n;
    permissions: Permissions;
}>;
//# sourceMappingURL=index.d.ts.map