import type { LinkProps } from 'next/link.js';
import * as React from 'react';
import './index.scss';
export declare const ButtonGroup: React.FC<{
    buttonSize?: 'default' | 'small';
    children: React.ReactNode;
    className?: string;
    textAlign?: 'center' | 'left' | 'right';
}>;
type MenuButtonProps = {
    active?: boolean;
    children: React.ReactNode;
    className?: string;
    href?: LinkProps['href'];
    id?: string;
    onClick?: () => void;
};
export declare const Button: React.FC<MenuButtonProps>;
export {};
//# sourceMappingURL=index.d.ts.map