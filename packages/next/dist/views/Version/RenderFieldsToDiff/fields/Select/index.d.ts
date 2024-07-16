import type { SelectFieldProps } from '@payloadcms/ui';
import type { MappedField } from '@payloadcms/ui/utilities/buildComponentMap';
import React from 'react';
import type { Props } from '../types.js';
import './index.scss';
declare const Select: React.FC<{
    field: MappedField & SelectFieldProps;
} & Omit<Props, 'field'>>;
export default Select;
//# sourceMappingURL=index.d.ts.map