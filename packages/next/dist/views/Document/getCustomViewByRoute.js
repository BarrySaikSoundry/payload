import { isPathMatchingRoute } from '../Root/isPathMatchingRoute.js';
export const getCustomViewByRoute = ({ baseRoute, currentRoute, views })=>{
    if (typeof views?.Edit === 'object' && typeof views?.Edit !== 'function') {
        const foundViewConfig = Object.entries(views.Edit).find(([, view])=>{
            if (typeof view === 'object' && typeof view !== 'function' && 'path' in view) {
                const viewPath = `${baseRoute}${view.path}`;
                return isPathMatchingRoute({
                    currentRoute,
                    exact: true,
                    path: viewPath
                });
            }
            return false;
        })?.[1];
        if (foundViewConfig && 'Component' in foundViewConfig) {
            return foundViewConfig.Component;
        }
    }
    return null;
};

//# sourceMappingURL=getCustomViewByRoute.js.map