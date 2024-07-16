import React from 'react';
export type SearchFilterProps = {
    fieldLabel?: string;
    fieldName?: string;
    handleChange?: (search: string) => void;
    listSearchableFields?: MappedField[];
};
import type { MappedField } from '../../providers/ComponentMap/buildComponentMap/types.js';
import './index.scss';
export declare const SearchFilter: React.FC<SearchFilterProps>;
//# sourceMappingURL=index.d.ts.map