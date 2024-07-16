import type { Payload } from 'payload';
type GetRequestLocalesArgs = {
    data?: Record<string, any>;
    localization: Exclude<Payload['config']['localization'], false>;
    searchParams?: URLSearchParams;
};
export declare function getRequestLocales({ data, localization, searchParams }: GetRequestLocalesArgs): {
    fallbackLocale: string;
    locale: string;
};
export {};
//# sourceMappingURL=getRequestLocales.d.ts.map