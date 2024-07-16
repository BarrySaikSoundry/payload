import React from 'react';
import './index.scss';
import type { SanitizedCollectionConfig } from 'payload';
export type ThumbnailProps = {
    className?: string;
    collectionSlug?: string;
    doc?: Record<string, unknown>;
    fileSrc?: string;
    imageCacheTag?: string;
    size?: 'expand' | 'large' | 'medium' | 'small';
    uploadConfig?: SanitizedCollectionConfig['upload'];
};
export declare const useThumbnailContext: () => {
    className: string;
    filename: string;
    size: string;
    src: string;
};
export declare const Thumbnail: React.FC<ThumbnailProps>;
//# sourceMappingURL=index.d.ts.map