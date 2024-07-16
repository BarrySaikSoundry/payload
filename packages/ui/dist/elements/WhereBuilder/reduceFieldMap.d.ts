import type { I18nClient } from '@payloadcms/translations';
import type { FieldMap } from '../../utilities/buildComponentMap.js';
export type ReduceFieldMapArgs = {
    fieldMap: FieldMap;
    i18n: I18nClient;
    labelPrefix?: string;
    pathPrefix?: string;
};
/**
 * Reduces a field map to a flat array of fields with labels and values.
 * Used in the WhereBuilder component to render the fields in the dropdown.
 */
export declare const reduceFieldMap: ({ fieldMap, i18n, labelPrefix, pathPrefix }: ReduceFieldMapArgs) => any[];
//# sourceMappingURL=reduceFieldMap.d.ts.map