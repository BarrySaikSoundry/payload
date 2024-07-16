import type { Field, FormState } from 'payload';
export declare const getNestedFieldState: ({ fieldSchema, formState, pathSegments: pathSegmentsFromProps, }: {
    fieldSchema?: Field[];
    formState?: FormState;
    path: string;
    pathSegments?: string[];
}) => {
    errorCount: number;
    fieldState: FormState;
    pathSegments: string[];
};
//# sourceMappingURL=getNestedFieldState.d.ts.map