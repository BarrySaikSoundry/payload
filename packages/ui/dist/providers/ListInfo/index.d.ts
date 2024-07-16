import type { ClientConfig, FieldAffectingData, SanitizedCollectionConfig } from 'payload';
import React from 'react';
import type { Column } from '../../elements/Table/index.js';
export type ColumnPreferences = Pick<Column, 'accessor' | 'active'>[];
export type ListInfoProps = {
    Header?: React.ReactNode;
    collectionConfig: ClientConfig['collections'][0];
    collectionSlug: SanitizedCollectionConfig['slug'];
    hasCreatePermission: boolean;
    newDocumentURL: string;
    titleField?: FieldAffectingData;
};
export type ListInfoContext = {
    Header?: React.ReactNode;
    collectionSlug: string;
    hasCreatePermission: boolean;
    newDocumentURL: string;
};
export declare const useListInfo: () => ListInfoContext;
export declare const ListInfoProvider: React.FC<{
    children: React.ReactNode;
} & ListInfoProps>;
//# sourceMappingURL=index.d.ts.map