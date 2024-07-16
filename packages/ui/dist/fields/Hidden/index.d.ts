import React from 'react';
import type { FormFieldBase } from '../index.js';
export type HiddenInputFieldProps = {
    disableModifyingForm?: false;
    forceUsePathFromProps?: boolean;
    name?: string;
    path?: string;
    value?: unknown;
} & FormFieldBase;
export declare const HiddenField: React.FC<HiddenInputFieldProps>;
//# sourceMappingURL=index.d.ts.map