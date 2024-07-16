import { calculateDefaultValues } from './calculateDefaultValues/index.js';
import { iterateFields } from './iterateFields.js';
export const buildStateFromSchema = async (args)=>{
    const { id, data: fullData = {}, fieldSchema, operation, preferences, req } = args;
    if (fieldSchema) {
        const state = {};
        const dataWithDefaultValues = await calculateDefaultValues({
            id,
            data: fullData,
            fields: fieldSchema,
            locale: req.locale,
            siblingData: fullData,
            user: req.user
        });
        await iterateFields({
            id,
            addErrorPathToParent: null,
            data: dataWithDefaultValues,
            fields: fieldSchema,
            fullData,
            operation,
            parentPassesCondition: true,
            path: '',
            preferences,
            req,
            state
        });
        return state;
    }
    return {};
};
export { iterateFields };

//# sourceMappingURL=index.js.map