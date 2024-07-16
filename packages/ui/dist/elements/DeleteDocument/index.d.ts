import type { SanitizedCollectionConfig } from 'payload';
import React from 'react';
import './index.scss';
export type Props = {
    buttonId?: string;
    collectionSlug: SanitizedCollectionConfig['slug'];
    id?: string;
    singularLabel: SanitizedCollectionConfig['labels']['singular'];
    title?: string;
    useAsTitle: SanitizedCollectionConfig['admin']['useAsTitle'];
};
export declare const DeleteDocument: React.FC<Props>;
//# sourceMappingURL=index.d.ts.map