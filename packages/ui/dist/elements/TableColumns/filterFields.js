'use client';
// 1. Skips fields that are hidden, disabled, or presentational-only (i.e. `ui` fields)
// 2. Maps through top-level `tabs` fields and filters out the same
export const filterFields = (fieldMap)=>{
    const shouldSkipField = (field)=>field.type !== 'ui' && field.disabled === true || field?.disableListColumn === true;
    const fields = fieldMap.reduce((formatted, field)=>{
        if (shouldSkipField(field)) {
            return formatted;
        }
        const formattedField = field.type === 'tabs' && 'tabs' in field.fieldComponentProps ? {
            ...field,
            fieldComponentProps: {
                ...field.fieldComponentProps,
                tabs: field.fieldComponentProps.tabs.map((tab)=>({
                        ...tab,
                        fieldMap: tab.fieldMap.filter((tabField)=>!shouldSkipField(tabField))
                    }))
            }
        } : field;
        return [
            ...formatted,
            formattedField
        ];
    }, []);
    return fields;
};

//# sourceMappingURL=filterFields.js.map