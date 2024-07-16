import type { Data, DocumentPreferences, Field, FormState, PayloadRequest } from 'payload';
export type AddFieldStatePromiseArgs = {
    addErrorPathToParent: (path: string) => void;
    /**
     * if all parents are localized, then the field is localized
     */
    anyParentLocalized?: boolean;
    data: Data;
    field: Field;
    fieldIndex: number;
    /**
     * You can use this to filter down to only `localized` fields that require translation (type: text, textarea, etc.). Another plugin might want to look for only `point` type fields to do some GIS function. With the filter function you can go in like a surgeon.
     */
    filter?: (args: AddFieldStatePromiseArgs) => boolean;
    /**
     * Force the value of fields like arrays or blocks to be the full value instead of the length @default false
     */
    forceFullValue?: boolean;
    fullData: Data;
    id: number | string;
    /**
     * Whether the field schema should be included in the state
     */
    includeSchema?: boolean;
    /**
     * Whether to omit parent fields in the state. @default false
     */
    omitParents?: boolean;
    operation: 'create' | 'update';
    passesCondition: boolean;
    path: string;
    preferences: DocumentPreferences;
    /**
     * Req is used for validation and defaultValue calculation. If you don't need validation,
     * just create your own req and pass in the locale and the user
     */
    req: PayloadRequest;
    /**
     * Whether to skip checking the field's condition. @default false
     */
    skipConditionChecks?: boolean;
    /**
     * Whether to skip validating the field. @default false
     */
    skipValidation?: boolean;
    state: FormState;
};
/**
 * Flattens the fields schema and fields data.
 * The output is the field path (e.g. array.0.name) mapped to a FormField object.
 */
export declare const addFieldStatePromise: (args: AddFieldStatePromiseArgs) => Promise<void>;
//# sourceMappingURL=addFieldStatePromise.d.ts.map