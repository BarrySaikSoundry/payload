import type { Field, PayloadRequest } from 'payload';
type NestedRichTextFieldsArgs = {
    currentDepth?: number;
    data: unknown;
    depth: number;
    draft: boolean;
    fields: Field[];
    overrideAccess: boolean;
    populationPromises: Promise<void>[];
    req: PayloadRequest;
    showHiddenFields: boolean;
};
export declare const recurseNestedFields: ({ currentDepth, data, depth, draft, fields, overrideAccess, populationPromises, req, showHiddenFields, }: NestedRichTextFieldsArgs) => void;
export {};
//# sourceMappingURL=recurseNestedFields.d.ts.map