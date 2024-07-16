import type { Data, DocumentPreferences, Field as FieldSchema, FormState, PayloadRequest } from 'payload';
import { iterateFields } from './iterateFields.js';
type Args = {
    data?: Data;
    fieldSchema: FieldSchema[] | undefined;
    id?: number | string;
    operation?: 'create' | 'update';
    preferences: DocumentPreferences;
    req: PayloadRequest;
    siblingData?: Data;
};
export type BuildFormStateArgs = {
    collectionSlug?: string;
    data?: Data;
    docPreferences?: DocumentPreferences;
    formState?: FormState;
    globalSlug?: string;
    id?: number | string;
    locale?: string;
    operation?: 'create' | 'update';
    schemaPath: string;
};
export declare const buildStateFromSchema: (args: Args) => Promise<FormState>;
export { iterateFields };
//# sourceMappingURL=index.d.ts.map