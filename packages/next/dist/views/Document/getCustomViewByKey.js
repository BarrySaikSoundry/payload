import { isReactComponentOrFunction } from 'payload/shared';
export const getCustomViewByKey = (views, customViewKey)=>{
    return typeof views?.Edit === 'function' ? views?.Edit : typeof views?.Edit === 'object' && views?.Edit?.[customViewKey] && typeof views?.Edit?.[customViewKey] === 'function' ? views?.Edit?.[customViewKey] : views?.Edit?.[customViewKey] ? typeof views?.Edit?.[customViewKey] === 'object' && 'Component' in views.Edit[customViewKey] && isReactComponentOrFunction(views?.Edit?.[customViewKey].Component) && views?.Edit?.[customViewKey].Component : null;
};

//# sourceMappingURL=getCustomViewByKey.js.map