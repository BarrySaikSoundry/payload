import sanitizeInternalFields from './utilities/sanitizeInternalFields.js';
import { withSession } from './withSession.js';
export const deleteOne = async function deleteOne({ collection, req = {}, where }) {
    const Model = this.collections[collection];
    const options = await withSession(this, req);
    const query = await Model.buildQuery({
        payload: this.payload,
        where
    });
    const doc = await Model.findOneAndDelete(query, options).lean();
    let result = JSON.parse(JSON.stringify(doc));
    // custom id type reset
    result.id = result._id;
    result = sanitizeInternalFields(result);
    return result;
};

//# sourceMappingURL=deleteOne.js.map