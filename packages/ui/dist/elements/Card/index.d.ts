import type { ElementType } from 'react';
import React from 'react';
import './index.scss';
export type Props = {
    Link?: ElementType;
    actions?: React.ReactNode;
    buttonAriaLabel?: string;
    href?: string;
    id?: string;
    onClick?: () => void;
    title: string;
    titleAs?: ElementType;
};
export declare const Card: React.FC<Props>;
//# sourceMappingURL=index.d.ts.map