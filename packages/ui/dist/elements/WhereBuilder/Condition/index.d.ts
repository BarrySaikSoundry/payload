import React from 'react';
import type { FieldCondition } from '../types.js';
export type Props = {
    addCondition: ({ andIndex, fieldName, orIndex, relation, }: {
        andIndex: number;
        fieldName: string;
        orIndex: number;
        relation: 'and' | 'or';
    }) => void;
    andIndex: number;
    fieldName: string;
    fields: FieldCondition[];
    initialValue: string;
    operator: Operator;
    orIndex: number;
    removeCondition: ({ andIndex, orIndex }: {
        andIndex: number;
        orIndex: number;
    }) => void;
    updateCondition: ({ andIndex, fieldName, operator, orIndex, value, }: {
        andIndex: number;
        fieldName: string;
        operator: string;
        orIndex: number;
        value: string;
    }) => void;
};
import type { Operator } from 'payload';
import './index.scss';
export declare const Condition: React.FC<Props>;
//# sourceMappingURL=index.d.ts.map