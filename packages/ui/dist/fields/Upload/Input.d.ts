import type { ClientCollectionConfig, FilterOptionsResult, UploadField } from 'payload';
import React from 'react';
import type { UploadFieldProps } from './types.js';
import './index.scss';
export type UploadInputProps = {
    api?: string;
    collection?: ClientCollectionConfig;
    customUploadActions?: React.ReactNode[];
    filterOptions?: FilterOptionsResult;
    onChange?: (e: any) => void;
    relationTo?: UploadField['relationTo'];
    serverURL?: string;
    showError?: boolean;
    value?: string;
} & Omit<UploadFieldProps, 'filterOptions'>;
export declare const UploadInput: React.FC<UploadInputProps>;
//# sourceMappingURL=Input.d.ts.map