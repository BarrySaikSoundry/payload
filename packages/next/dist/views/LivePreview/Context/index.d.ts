import type { ClientFieldConfig, LivePreviewConfig } from 'payload';
import React from 'react';
import type { usePopupWindow } from '../usePopupWindow.js';
export type LivePreviewProviderProps = {
    appIsReady?: boolean;
    breakpoints?: LivePreviewConfig['breakpoints'];
    children: React.ReactNode;
    deviceSize?: {
        height: number;
        width: number;
    };
    fieldSchema: ClientFieldConfig[];
    isPopupOpen?: boolean;
    openPopupWindow?: ReturnType<typeof usePopupWindow>['openPopupWindow'];
    popupRef?: React.MutableRefObject<Window>;
    url?: string;
};
export declare const LivePreviewProvider: React.FC<LivePreviewProviderProps>;
//# sourceMappingURL=index.d.ts.map