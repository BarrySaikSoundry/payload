import React from 'react';
import type { ActionMap } from '../ComponentMap/buildComponentMap/types.js';
export { SetViewActions } from './SetViewActions/index.js';
type ActionsContextType = {
    actions: ActionMap['Edit'][string];
    setViewActions: (actions: ActionMap['Edit'][string]) => void;
};
export declare const useActions: () => ActionsContextType;
export declare const ActionsProvider: ({ children }: {
    children: any;
}) => React.JSX.Element;
//# sourceMappingURL=index.d.ts.map