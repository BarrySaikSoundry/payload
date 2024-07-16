import type { I18n } from '@payloadcms/translations';
import type { Metadata } from 'next';
import type { SanitizedConfig } from 'payload';
import React from 'react';
export { generatePageMetadata } from './meta.js';
export type GenerateViewMetadata = (args: {
    config: SanitizedConfig;
    i18n: I18n;
    isEditing?: boolean;
    params?: {
        [key: string]: string | string[];
    };
}) => Promise<Metadata>;
export declare const RootPage: ({ config: configPromise, params, searchParams, }: {
    config: Promise<SanitizedConfig>;
    params: {
        segments: string[];
    };
    searchParams: {
        [key: string]: string | string[];
    };
}) => Promise<React.JSX.Element>;
//# sourceMappingURL=index.d.ts.map