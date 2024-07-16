import type { SanitizedConfig } from 'payload';
export declare const OPTIONS: (config: Promise<SanitizedConfig> | SanitizedConfig) => (request: Request) => Promise<Response>;
export declare const GET: (config: Promise<SanitizedConfig> | SanitizedConfig) => (request: Request, { params: { slug } }: {
    params: {
        slug: string[];
    };
}) => Promise<Response>;
export declare const POST: (config: Promise<SanitizedConfig> | SanitizedConfig) => (request: Request, { params: { slug } }: {
    params: {
        slug: string[];
    };
}) => Promise<Response>;
export declare const DELETE: (config: Promise<SanitizedConfig> | SanitizedConfig) => (request: Request, { params: { slug } }: {
    params: {
        slug: string[];
    };
}) => Promise<Response>;
export declare const PATCH: (config: Promise<SanitizedConfig> | SanitizedConfig) => (request: Request, { params: { slug } }: {
    params: {
        slug: string[];
    };
}) => Promise<Response>;
//# sourceMappingURL=index.d.ts.map