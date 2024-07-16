import type { I18n } from '@payloadcms/translations';
import type { SanitizedConfig } from 'payload';
/**
 * In the context of Next.js, this function initializes the i18n object for the current request.
 *
 * It must be called on the server side, and within the lifecycle of a request since it relies on the request headers and cookies.
 */
export declare const getNextRequestI18n: ({ config }: {
    config: SanitizedConfig;
}) => Promise<I18n>;
//# sourceMappingURL=getNextRequestI18n.d.ts.map