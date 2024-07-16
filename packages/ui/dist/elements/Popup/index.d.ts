import type { CSSProperties } from 'react';
export * as PopupList from './PopupButtonList/index.js';
import React from 'react';
import './index.scss';
export type PopupProps = {
    backgroundColor?: CSSProperties['backgroundColor'];
    boundingRef?: React.MutableRefObject<HTMLElement>;
    button?: React.ReactNode;
    buttonClassName?: string;
    buttonType?: 'custom' | 'default' | 'none';
    caret?: boolean;
    children?: React.ReactNode;
    className?: string;
    forceOpen?: boolean;
    horizontalAlign?: 'center' | 'left' | 'right';
    initActive?: boolean;
    onToggleOpen?: (active: boolean) => void;
    render?: (any: any) => React.ReactNode;
    showOnHover?: boolean;
    showScrollbar?: boolean;
    size?: 'fit-content' | 'large' | 'medium' | 'small';
    verticalAlign?: 'bottom' | 'top';
};
export declare const Popup: React.FC<PopupProps>;
//# sourceMappingURL=index.d.ts.map