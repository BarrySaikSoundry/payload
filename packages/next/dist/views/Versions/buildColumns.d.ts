import type { I18n } from '@payloadcms/translations';
import type { SanitizedCollectionConfig, SanitizedConfig, SanitizedGlobalConfig } from 'payload';
import { type Column } from '@payloadcms/ui';
export declare const buildVersionColumns: ({ collectionConfig, docID, globalConfig, i18n: { t }, latestDraftVersion, latestPublishedVersion, }: {
    collectionConfig?: SanitizedCollectionConfig;
    config: SanitizedConfig;
    docID?: number | string;
    globalConfig?: SanitizedGlobalConfig;
    i18n: I18n;
    latestDraftVersion?: string;
    latestPublishedVersion?: string;
}) => Column[];
//# sourceMappingURL=buildColumns.d.ts.map