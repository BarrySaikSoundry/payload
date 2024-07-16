import type { FormState, SanitizedCollectionConfig } from 'payload';
import React from 'react';
import './index.scss';
export declare const editDrawerSlug = "edit-upload";
export declare const sizePreviewSlug = "preview-sizes";
type UploadActionsArgs = {
    customActions?: React.ReactNode[];
    enableAdjustments: boolean;
    enablePreviewSizes: boolean;
    mimeType: string;
};
export declare const UploadActions: ({ customActions, enableAdjustments, enablePreviewSizes, mimeType, }: UploadActionsArgs) => React.JSX.Element;
export type UploadProps = {
    collectionSlug: string;
    customActions?: React.ReactNode[];
    initialState?: FormState;
    onChange?: (file?: File) => void;
    uploadConfig: SanitizedCollectionConfig['upload'];
};
export declare const Upload: React.FC<UploadProps>;
export {};
//# sourceMappingURL=index.d.ts.map