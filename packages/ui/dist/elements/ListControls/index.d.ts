import type { ClientCollectionConfig, Where } from 'payload';
import React from 'react';
import type { FieldMap } from '../../providers/ComponentMap/buildComponentMap/types.js';
import './index.scss';
export type ListControlsProps = {
    collectionConfig: ClientCollectionConfig;
    enableColumns?: boolean;
    enableSort?: boolean;
    fieldMap: FieldMap;
    handleSearchChange?: (search: string) => void;
    handleSortChange?: (sort: string) => void;
    handleWhereChange?: (where: Where) => void;
};
/**
 * The ListControls component is used to render the controls (search, filter, where)
 * for a collection's list view. You can find those directly above the table which lists
 * the collection's documents.
 */
export declare const ListControls: React.FC<ListControlsProps>;
//# sourceMappingURL=index.d.ts.map