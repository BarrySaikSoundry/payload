import type { Data, DocumentPreferences, Field as FieldSchema, FormState, PayloadRequest } from 'payload';
import type { AddFieldStatePromiseArgs } from './addFieldStatePromise.js';
type Args = {
    addErrorPathToParent: (path: string) => void;
    /**
     * if any parents is localized, then the field is localized. @default false
     */
    anyParentLocalized?: boolean;
    data: Data;
    fields: FieldSchema[];
    filter?: (args: AddFieldStatePromiseArgs) => boolean;
    /**
     * Force the value of fields like arrays or blocks to be the full value instead of the length @default false
     */
    forceFullValue?: boolean;
    fullData: Data;
    id?: number | string;
    /**
     * Whether the field schema should be included in the state. @default false
     */
    includeSchema?: boolean;
    /**
     * Whether to omit parent fields in the state. @default false
     */
    omitParents?: boolean;
    /**
     * operation is only needed for validation
     */
    operation: 'create' | 'update';
    parentPassesCondition?: boolean;
    /**
     * The initial path of the field. @default ''
     */
    path?: string;
    preferences?: DocumentPreferences;
    req: PayloadRequest;
    /**
     * Whether to skip checking the field's condition. @default false
     */
    skipConditionChecks?: boolean;
    /**
     * Whether to skip validating the field. @default false
     */
    skipValidation?: boolean;
    state?: FormState;
};
/**
 * Flattens the fields schema and fields data
 */
export declare const iterateFields: ({ id, addErrorPathToParent: addErrorPathToParentArg, anyParentLocalized, data, fields, filter, forceFullValue, fullData, includeSchema, omitParents, operation, parentPassesCondition, path, preferences, req, skipConditionChecks, skipValidation, state, }: Args) => Promise<void>;
export {};
//# sourceMappingURL=iterateFields.d.ts.map