import type { I18n } from '@payloadcms/translations';
import type { Metadata } from 'next';
import type { AdminViewComponent, SanitizedConfig } from 'payload';
import React from 'react';
export declare const generatePageMetadata: ({ config: configPromise, }: {
    config: Promise<SanitizedConfig> | SanitizedConfig;
    params?: {
        [key: string]: string | string[];
    };
}) => Promise<Metadata>;
export type GenerateViewMetadata = (args: {
    config: SanitizedConfig;
    i18n: I18n;
    params?: {
        [key: string]: string | string[];
    };
}) => Promise<Metadata>;
export declare const NotFoundPage: ({ config: configPromise, params, searchParams, }: {
    config: Promise<SanitizedConfig>;
    params: {
        segments: string[];
    };
    searchParams: {
        [key: string]: string | string[];
    };
}) => Promise<React.JSX.Element>;
export declare const NotFoundView: AdminViewComponent;
//# sourceMappingURL=index.d.ts.map