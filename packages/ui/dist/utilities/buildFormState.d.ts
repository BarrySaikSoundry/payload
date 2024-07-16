import type { FormState, PayloadRequest } from 'payload';
import type { FieldSchemaMap } from './buildFieldSchemaMap/types.js';
export declare const getFieldSchemaMap: (req: PayloadRequest) => FieldSchemaMap;
export declare const buildFormState: ({ req }: {
    req: PayloadRequest;
}) => Promise<FormState>;
//# sourceMappingURL=buildFormState.d.ts.map