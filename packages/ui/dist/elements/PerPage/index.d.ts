import React from 'react';
import './index.scss';
export type PerPageProps = {
    defaultLimit?: number;
    handleChange?: (limit: number) => void;
    limit: number;
    limits: number[];
    resetPage?: boolean;
};
export declare const PerPage: React.FC<PerPageProps>;
//# sourceMappingURL=index.d.ts.map