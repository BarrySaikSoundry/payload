import type { SanitizedConfig } from 'payload';
import '@payloadcms/ui/scss/app.scss';
import React from 'react';
export declare const metadata: {
    description: string;
    title: string;
};
export declare const RootLayout: ({ children, config: configPromise, }: {
    children: React.ReactNode;
    config: Promise<SanitizedConfig>;
}) => Promise<React.JSX.Element>;
//# sourceMappingURL=index.d.ts.map