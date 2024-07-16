import type { Field, SanitizedConfig } from 'payload';
type Args = {
    config: SanitizedConfig;
    fields: Field[];
    locale: string;
    result?: string;
    segments: string[];
};
export declare const getLocalizedSortProperty: ({ config, fields: incomingFields, locale, result: incomingResult, segments: incomingSegments, }: Args) => string;
export {};
//# sourceMappingURL=getLocalizedSortProperty.d.ts.map