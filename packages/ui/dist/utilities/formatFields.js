import { fieldAffectsData } from 'payload/shared';
export const formatFields = (fields, isEditing)=>isEditing ? fields.filter((field)=>!fieldAffectsData(field) || field.name !== 'id') : fields;

//# sourceMappingURL=formatFields.js.map