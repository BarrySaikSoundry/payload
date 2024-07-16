import { handleError } from './utilities/handleError.js';
import sanitizeInternalFields from './utilities/sanitizeInternalFields.js';
import { withSession } from './withSession.js';
export const updateOne = async function updateOne({ id, collection, data, locale, req = {}, where: whereArg }) {
    const where = id ? {
        id: {
            equals: id
        }
    } : whereArg;
    const Model = this.collections[collection];
    const options = {
        ...await withSession(this, req),
        lean: true,
        new: true
    };
    const query = await Model.buildQuery({
        locale,
        payload: this.payload,
        where
    });
    let result;
    try {
        result = await Model.findOneAndUpdate(query, data, options);
    } catch (error) {
        handleError({
            collection,
            error,
            req
        });
    }
    result = JSON.parse(JSON.stringify(result));
    result.id = result._id;
    result = sanitizeInternalFields(result);
    return result;
};

//# sourceMappingURL=updateOne.js.map