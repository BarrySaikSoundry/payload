import React from 'react';
import './index.scss';
import type { Data, FileSizes, SanitizedCollectionConfig } from 'payload';
export type FileDetailsProps = {
    collectionSlug: string;
    customUploadActions?: React.ReactNode[];
    doc: {
        sizes?: FileSizes;
    } & Data;
    enableAdjustments?: boolean;
    handleRemove?: () => void;
    hasImageSizes?: boolean;
    imageCacheTag?: string;
    uploadConfig: SanitizedCollectionConfig['upload'];
};
export declare const FileDetails: React.FC<FileDetailsProps>;
//# sourceMappingURL=index.d.ts.map