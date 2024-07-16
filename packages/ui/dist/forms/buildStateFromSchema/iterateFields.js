import { fieldIsPresentationalOnly } from 'payload/shared';
import { addFieldStatePromise } from './addFieldStatePromise.js';
/**
 * Flattens the fields schema and fields data
 */ export const iterateFields = async ({ id, addErrorPathToParent: addErrorPathToParentArg, anyParentLocalized = false, data, fields, filter, forceFullValue = false, fullData, includeSchema = false, omitParents = false, operation, parentPassesCondition = true, path = '', preferences, req, skipConditionChecks = false, skipValidation = false, state = {} })=>{
    const promises = [];
    fields.forEach((field, fieldIndex)=>{
        if (!fieldIsPresentationalOnly(field) && !field?.admin?.disabled) {
            let passesCondition = true;
            if (!skipConditionChecks) {
                passesCondition = Boolean((field?.admin?.condition ? Boolean(field.admin.condition(fullData || {}, data || {}, {
                    user: req.user
                })) : true) && parentPassesCondition);
            }
            promises.push(addFieldStatePromise({
                id,
                addErrorPathToParent: addErrorPathToParentArg,
                anyParentLocalized,
                data,
                field,
                fieldIndex,
                filter,
                forceFullValue,
                fullData,
                includeSchema,
                omitParents,
                operation,
                passesCondition,
                path,
                preferences,
                req,
                skipConditionChecks,
                skipValidation,
                state
            }));
        }
    });
    await Promise.all(promises);
};

//# sourceMappingURL=iterateFields.js.map