import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
export const mapActions = (args)=>{
    const { WithServerSideProps, collectionConfig, globalConfig } = args;
    const editViews = (collectionConfig || globalConfig)?.admin?.components?.views?.Edit;
    const listActions = typeof collectionConfig?.admin?.components?.views?.List === 'object' ? collectionConfig?.admin?.components?.views?.List?.actions : undefined;
    const result = {
        Edit: {},
        List: []
    };
    if (editViews) {
        Object.entries(editViews).forEach(([key, view])=>{
            if (typeof view === 'object' && 'actions' in view) {
                view.actions.forEach((action)=>{
                    const Action = action;
                    if (typeof Action === 'function') {
                        result.Edit[key] = [
                            ...result[key] || [],
                            /*#__PURE__*/ _jsx(WithServerSideProps, {
                                Component: Action
                            }, key)
                        ];
                    }
                });
            }
        });
    }
    if (listActions) {
        listActions.forEach((action, i)=>{
            const Action = action;
            if (typeof Action === 'function') {
                // eslint-disable-next-line @typescript-eslint/no-floating-promises
                result.List = [
                    ...result.List,
                    /*#__PURE__*/ _jsx(WithServerSideProps, {
                        Component: Action
                    }, i)
                ];
            }
        });
    }
    return result;
};

//# sourceMappingURL=actions.js.map