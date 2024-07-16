import type { FieldMap } from '../providers/ComponentMap/buildComponentMap/types.js';
/**
 * Flattens a collection's fields into a single array of fields, as long
 * as the fields do not affect data.
 *
 * @param fields
 * @param keepPresentationalFields if true, will skip flattening fields that are presentational only
 */
export declare const flattenFieldMap: (fieldMap: FieldMap, keepPresentationalFields?: boolean) => FieldMap;
//# sourceMappingURL=flattenFieldMap.d.ts.map