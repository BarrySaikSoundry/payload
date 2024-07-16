import { fieldAffectsData } from 'payload/shared';
const isFieldNullable = (field, force)=>{
    const hasReadAccessControl = field.access && field.access.read;
    const condition = field.admin && field.admin.condition;
    return !(force && fieldAffectsData(field) && 'required' in field && field.required && !field.localized && !condition && !hasReadAccessControl);
};
export default isFieldNullable;

//# sourceMappingURL=isFieldNullable.js.map