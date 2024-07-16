import type { FormFieldBase } from '@payloadcms/ui';
import React from 'react';
import './index.scss';
type Props = {
    name: string;
    richTextComponentMap: Map<string, React.ReactNode>;
} & FormFieldBase;
export declare const Element: (props: Props) => React.ReactNode;
export {};
//# sourceMappingURL=index.d.ts.map