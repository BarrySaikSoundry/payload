import { defaultValuePromise } from './promise.js';
export const iterateFields = async ({ id, data, fields, locale, siblingData, user })=>{
    const promises = [];
    fields.forEach((field)=>{
        promises.push(defaultValuePromise({
            id,
            data,
            field,
            locale,
            siblingData,
            user
        }));
    });
    await Promise.all(promises);
};

//# sourceMappingURL=iterateFields.js.map