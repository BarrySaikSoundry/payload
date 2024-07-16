import type { I18n } from '@payloadcms/translations';
type FormatDateArgs = {
    date: Date | number | string | undefined;
    i18n: I18n<any, any>;
    pattern: string;
};
export declare const formatDate: ({ date, i18n, pattern }: FormatDateArgs) => string;
type FormatTimeToNowArgs = {
    date: Date | number | string | undefined;
    i18n: I18n<any, any>;
};
export declare const formatTimeToNow: ({ date, i18n }: FormatTimeToNowArgs) => string;
export {};
//# sourceMappingURL=formatDate.d.ts.map