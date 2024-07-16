import { flattenFieldMap } from '../utilities/flattenFieldMap.js';
export const useUseTitleField = (collection, fieldMap)=>{
    const { admin: { useAsTitle } } = collection;
    const topLevelFields = flattenFieldMap(fieldMap);
    return topLevelFields.find((field)=>field.name === useAsTitle);
};

//# sourceMappingURL=useUseAsTitle.js.map