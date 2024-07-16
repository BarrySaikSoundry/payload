import type { I18nClient } from '@payloadcms/translations';
import type { AdminViewProps, EditViewProps, SanitizedCollectionConfig, SanitizedConfig } from 'payload';
import React from 'react';
import type { WithServerSidePropsPrePopulated } from './index.js';
import type { CollectionComponentMap } from './types.js';
export declare const mapCollections: (args: {
    DefaultEditView: React.FC<EditViewProps>;
    DefaultListView: React.FC<AdminViewProps>;
    WithServerSideProps: WithServerSidePropsPrePopulated;
    collections: SanitizedCollectionConfig[];
    config: SanitizedConfig;
    i18n: I18nClient;
    readOnly?: boolean;
}) => {
    [key: SanitizedCollectionConfig["slug"]]: CollectionComponentMap;
};
//# sourceMappingURL=collections.d.ts.map