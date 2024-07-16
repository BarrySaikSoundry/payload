import { fieldAffectsData, fieldIsPresentationalOnly } from 'payload/shared';
import fieldToSchemaMap from './fieldToWhereInputSchemaMap.js';
const recursivelyBuildNestedPaths = ({ field, nestedFieldName2, parentName })=>{
    const fieldName = fieldAffectsData(field) ? field.name : undefined;
    const nestedFieldName = fieldName || nestedFieldName2;
    if (field.type === 'tabs') {
        // if the tab has a name, treat it as a group
        // otherwise, treat it as a row
        return field.tabs.reduce((tabSchema, tab)=>{
            tabSchema.push(...recursivelyBuildNestedPaths({
                field: {
                    ...tab,
                    type: 'name' in tab ? 'group' : 'row'
                },
                nestedFieldName2: nestedFieldName,
                parentName
            }));
            return tabSchema;
        }, []);
    }
    const nestedPaths = field.fields.reduce((nestedFields, nestedField)=>{
        if (!fieldIsPresentationalOnly(nestedField)) {
            if (!fieldAffectsData(nestedField)) {
                return [
                    ...nestedFields,
                    ...recursivelyBuildNestedPaths({
                        field: nestedField,
                        nestedFieldName2: nestedFieldName,
                        parentName
                    })
                ];
            }
            const nestedPathName = fieldAffectsData(nestedField) ? `${nestedFieldName ? `${nestedFieldName}__` : ''}${nestedField.name}` : undefined;
            const getFieldSchema = fieldToSchemaMap({
                nestedFieldName,
                parentName
            })[nestedField.type];
            if (getFieldSchema) {
                const fieldSchema = getFieldSchema({
                    ...nestedField,
                    name: nestedPathName
                });
                if (Array.isArray(fieldSchema)) {
                    return [
                        ...nestedFields,
                        ...fieldSchema
                    ];
                }
                return [
                    ...nestedFields,
                    {
                        type: fieldSchema,
                        key: nestedPathName
                    }
                ];
            }
        }
        return nestedFields;
    }, []);
    return nestedPaths;
};
export default recursivelyBuildNestedPaths;

//# sourceMappingURL=recursivelyBuildNestedPaths.js.map