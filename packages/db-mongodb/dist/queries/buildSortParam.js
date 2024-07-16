import { getLocalizedSortProperty } from './getLocalizedSortProperty.js';
export const buildSortParam = ({ config, fields, locale, sort, timestamps })=>{
    let sortProperty;
    let sortDirection = 'desc';
    if (!sort) {
        if (timestamps) {
            sortProperty = 'createdAt';
        } else {
            sortProperty = '_id';
        }
    } else if (sort.indexOf('-') === 0) {
        sortProperty = sort.substring(1);
    } else {
        sortProperty = sort;
        sortDirection = 'asc';
    }
    if (sortProperty === 'id') {
        sortProperty = '_id';
    } else {
        sortProperty = getLocalizedSortProperty({
            config,
            fields,
            locale,
            segments: sortProperty.split('.')
        });
    }
    return {
        [sortProperty]: sortDirection
    };
};

//# sourceMappingURL=buildSortParam.js.map