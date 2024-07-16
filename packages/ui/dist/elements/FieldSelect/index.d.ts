import type { FieldWithPath } from 'payload';
import React, { type JSX } from 'react';
import type { FieldMap, MappedField } from '../../providers/ComponentMap/buildComponentMap/types.js';
import './index.scss';
export type FieldSelectProps = {
    fieldMap: FieldMap;
    setSelected: (fields: FieldWithPath[]) => void;
};
export declare const combineLabel: ({ customLabel, field, prefix, }: {
    customLabel?: string;
    field?: MappedField;
    prefix?: JSX.Element | string;
}) => JSX.Element;
export declare const FieldSelect: React.FC<FieldSelectProps>;
//# sourceMappingURL=index.d.ts.map