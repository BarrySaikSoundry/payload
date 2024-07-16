import React from 'react';
type RowLabelType<T = unknown> = {
    data: T;
    path: string;
    rowNumber?: number;
};
type Props<T> = {
    children: React.ReactNode;
} & Omit<RowLabelType<T>, 'data'>;
export declare const RowLabelProvider: React.FC<Props<unknown>>;
export declare const useRowLabel: <T>() => RowLabelType<T>;
export {};
//# sourceMappingURL=index.d.ts.map