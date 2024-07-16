import type { LabelProps, SanitizedLabelProps } from 'payload';
import React from 'react';
export type CheckboxInputProps = {
    AfterInput?: React.ReactNode;
    BeforeInput?: React.ReactNode;
    CustomLabel?: React.ReactNode;
    checked?: boolean;
    className?: string;
    id?: string;
    inputRef?: React.RefObject<HTMLInputElement | null>;
    label?: LabelProps['label'];
    labelProps?: SanitizedLabelProps;
    name?: string;
    onToggle: (event: React.ChangeEvent<HTMLInputElement>) => void;
    partialChecked?: boolean;
    readOnly?: boolean;
    required?: boolean;
};
export declare const inputBaseClass = "checkbox-input";
export declare const CheckboxInput: React.FC<CheckboxInputProps>;
//# sourceMappingURL=Input.d.ts.map