import type { I18nClient } from '@payloadcms/translations';
import type { ClientCollectionConfig, ClientGlobalConfig, Permissions } from 'payload';
export declare enum EntityType {
    collection = "collections",
    global = "globals"
}
export type EntityToGroup = {
    entity: ClientCollectionConfig;
    type: EntityType.collection;
} | {
    entity: ClientGlobalConfig;
    type: EntityType.global;
};
export type Group = {
    entities: EntityToGroup[];
    label: string;
};
export declare function groupNavItems(entities: EntityToGroup[], permissions: Permissions, i18n: I18nClient): Group[];
//# sourceMappingURL=groupNavItems.d.ts.map