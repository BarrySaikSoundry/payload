import type CropType from 'react-image-crop';
import React from 'react';
import 'react-image-crop/dist/ReactCrop.css';
import './index.scss';
type FocalPosition = {
    x: number;
    y: number;
};
export type EditUploadProps = {
    fileName: string;
    fileSrc: string;
    imageCacheTag?: string;
    initialCrop?: CropType;
    initialFocalPoint?: FocalPosition;
    onSave?: ({ crop, focalPosition }: {
        crop: CropType;
        focalPosition: FocalPosition;
    }) => void;
    showCrop?: boolean;
    showFocalPoint?: boolean;
};
export declare const EditUpload: React.FC<EditUploadProps>;
export {};
//# sourceMappingURL=index.d.ts.map