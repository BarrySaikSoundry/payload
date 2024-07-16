import React from 'react';
import './index.scss';
export type PopupTriggerProps = {
    active: boolean;
    button: React.ReactNode;
    buttonType: 'custom' | 'default' | 'none';
    className?: string;
    setActive: (active: boolean) => void;
};
export declare const PopupTrigger: React.FC<PopupTriggerProps>;
//# sourceMappingURL=index.d.ts.map