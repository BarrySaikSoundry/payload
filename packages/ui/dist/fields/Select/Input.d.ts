import type { OptionObject } from 'payload';
import React from 'react';
import type { ReactSelectAdapterProps } from '../../elements/ReactSelect/types.js';
import type { SelectFieldProps } from './index.js';
import './index.scss';
export type SelectInputProps = {
    onChange?: ReactSelectAdapterProps['onChange'];
    options?: OptionObject[];
    showError?: boolean;
    value?: string | string[];
} & Omit<SelectFieldProps, 'custom' | 'disabled' | 'docPreferences' | 'locale' | 'localized' | 'onChange' | 'options' | 'rtl' | 'type' | 'user' | 'validate' | 'value'>;
export declare const SelectInput: React.FC<SelectInputProps>;
//# sourceMappingURL=Input.d.ts.map