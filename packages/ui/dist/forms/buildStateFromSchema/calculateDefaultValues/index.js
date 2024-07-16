import { iterateFields } from './iterateFields.js';
export const calculateDefaultValues = async ({ id, data, fields, locale, user })=>{
    await iterateFields({
        id,
        data,
        fields,
        locale,
        siblingData: data,
        user
    });
    return data;
};

//# sourceMappingURL=index.js.map