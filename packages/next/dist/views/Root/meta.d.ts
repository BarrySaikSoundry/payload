import type { Metadata } from 'next';
import type { SanitizedConfig } from 'payload';
type Args = {
    config: Promise<SanitizedConfig>;
    params: {
        [key: string]: string | string[];
    };
    searchParams: {
        [key: string]: string | string[];
    };
};
export declare const generatePageMetadata: ({ config: configPromise, params }: Args) => Promise<Metadata>;
export {};
//# sourceMappingURL=meta.d.ts.map