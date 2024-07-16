import { flattenFieldMap } from '../../utilities/flattenFieldMap.js';
export const getTextFieldsToBeSearched = (listSearchableFields, fieldMap)=>{
    if (listSearchableFields) {
        const flattenedFields = flattenFieldMap(fieldMap);
        return flattenedFields.filter((field)=>field.isFieldAffectingData && listSearchableFields.includes(field.name));
    }
    return null;
};

//# sourceMappingURL=getTextFieldsToBeSearched.js.map