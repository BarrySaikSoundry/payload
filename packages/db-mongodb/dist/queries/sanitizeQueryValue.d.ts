import type { Field, TabAsField } from 'payload';
type SanitizeQueryValueArgs = {
    field: Field | TabAsField;
    hasCustomID: boolean;
    operator: string;
    path: string;
    val: any;
};
export declare const sanitizeQueryValue: ({ field, hasCustomID, operator, path, val, }: SanitizeQueryValueArgs) => {
    operator?: string;
    rawQuery?: unknown;
    val?: unknown;
};
export {};
//# sourceMappingURL=sanitizeQueryValue.d.ts.map