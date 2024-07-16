import React from 'react';
import type { ComponentMap, FieldMap, MappedField } from './buildComponentMap/types.js';
export type IComponentMapContext = {
    componentMap: ComponentMap;
    getComponentMap: (args: {
        collectionSlug?: string;
        globalSlug?: string;
    }) => ComponentMap['collections'][0] | ComponentMap['globals'][0];
    getFieldMap: (args: {
        collectionSlug?: string;
        globalSlug?: string;
    }) => [] | FieldMap;
    getMappedFieldByPath: (args: {
        collectionSlug?: string;
        globalSlug?: string;
        path: string;
    }) => MappedField | undefined;
};
export declare const ComponentMapProvider: React.FC<{
    children: React.ReactNode;
    componentMap: ComponentMap;
}>;
export declare const useComponentMap: () => IComponentMapContext;
//# sourceMappingURL=index.d.ts.map