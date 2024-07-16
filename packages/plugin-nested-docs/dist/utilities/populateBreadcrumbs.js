import { formatBreadcrumb } from './formatBreadcrumb.js';
import { getParents } from './getParents.js';
export const populateBreadcrumbs = async (req, pluginConfig, collection, data, originalDoc)=>{
    const newData = data;
    const breadcrumbDocs = [
        ...await getParents(req, pluginConfig, collection, {
            ...originalDoc,
            ...data
        })
    ];
    const currentDocBreadcrumb = {
        ...originalDoc,
        ...data
    };
    if (originalDoc?.id) {
        currentDocBreadcrumb.id = originalDoc?.id;
    }
    breadcrumbDocs.push(currentDocBreadcrumb);
    const breadcrumbs = breadcrumbDocs.map((_, i)=>formatBreadcrumb(pluginConfig, collection, breadcrumbDocs.slice(0, i + 1)));
    return {
        ...newData,
        [pluginConfig?.breadcrumbsFieldSlug || 'breadcrumbs']: breadcrumbs
    };
};

//# sourceMappingURL=populateBreadcrumbs.js.map