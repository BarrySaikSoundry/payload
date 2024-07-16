import mongoose from 'mongoose';
import { fieldAffectsData } from 'payload/shared';
const convertValue = ({ relatedCollection, value })=>{
    const customIDField = relatedCollection.fields.find((field)=>fieldAffectsData(field) && field.name === 'id');
    if (!customIDField) return new mongoose.Types.ObjectId(value);
    return value;
};
function isValidRelationObject(value) {
    return typeof value === 'object' && value !== null && 'relationTo' in value && 'value' in value;
}
export const getBeforeChangeHook = ({ config, field })=>({ value })=>{
        let relatedCollection;
        const hasManyRelations = typeof field.relationTo !== 'string';
        if (!hasManyRelations) {
            relatedCollection = config.collections?.find(({ slug })=>slug === field.relationTo);
        }
        if (Array.isArray(value)) {
            return value.map((val)=>{
                // Handle has many
                if (relatedCollection && val && (typeof val === 'string' || typeof val === 'number')) {
                    return convertValue({
                        relatedCollection,
                        value: val
                    });
                }
                // Handle has many - polymorphic
                if (isValidRelationObject(val)) {
                    const relatedCollectionForSingleValue = config.collections?.find(({ slug })=>slug === val.relationTo);
                    if (relatedCollectionForSingleValue) {
                        return {
                            relationTo: val.relationTo,
                            value: convertValue({
                                relatedCollection: relatedCollectionForSingleValue,
                                value: val.value
                            })
                        };
                    }
                }
                return val;
            });
        }
        // Handle has one - polymorphic
        if (isValidRelationObject(value)) {
            relatedCollection = config.collections?.find(({ slug })=>slug === value.relationTo);
            if (relatedCollection) {
                return {
                    relationTo: value.relationTo,
                    value: convertValue({
                        relatedCollection,
                        value: value.value
                    })
                };
            }
        }
        // Handle has one
        if (relatedCollection && value && (typeof value === 'string' || typeof value === 'number')) {
            return convertValue({
                relatedCollection,
                value
            });
        }
        return value;
    };

//# sourceMappingURL=beforeChange.js.map